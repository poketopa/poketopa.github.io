---
title: "Handling Two Concurrent Requests in MySQL InnoDB"
description: "Comparing InnoDB locks, conditional updates, and deadlocks through inventory decrements"
publishedAt: 2026-11-01
category: Development
tags: ["MySQL", "InnoDB", "SQL", "데이터베이스", "동시성"]
cover: "/images/rilog/368/06.jpg"
draft: false
---

<em><strong>Handling two requests that read the same inventory in MySQL InnoDB</strong></em>

Two orders arrive for a product with one item left. The order-handling code is simple: read the inventory, decrement the quantity if at least one remains, and save the order. Inventory changes and order insertion are wrapped in a single transaction.

If saving the order fails, the inventory can be restored, and a constraint prevents negative quantities. That seems sufficient. But if the second request also reads the same inventory before the first request decrements it, what values will the two requests save?

I coordinated two connections so both read an inventory of 1, then had each save its calculated value of 0 and an order. The result was <strong>inventory 0, two orders</strong>. The quantity was not negative, and both transactions committed normally. But we had accepted two orders for one item.

![01-stale-read.png](/images/rilog/368/01.webp)

Looking only at the remaining quantity is not enough to detect this problem. In this example, with no restocking or cancellations, the following relationship must hold.

```text
초기 재고 = 남은 재고 + 커밋된 주문 수량의 합
```

This is an experiment comparing ways to preserve that relationship, rather than a retrospective on an actual service incident. It handles one product's inventory using InnoDB in MySQL 8.4.13, then expands to orders involving two products. Starting with orders allowed on stale values, we will distinguish visible values from locks, then examine wait times and deadlocks.

## 1\. Saving together is not enough

In the first experiment, separate DB connections A and B began transactions and read inventory 1. After both completed their reads, A committed first, then B proceeded. Rather than blindly sending many requests, this setup exposes the sequence that causes the problem.

The key lies in the decrement SQL. The initial implementation kept the value read on the application side, subtracted 1, and sent the result to the DB. In the experiment, connection-specific user variables reproduced this behavior.

```sql
-- A와 B가 각각 실행해 모두 1을 읽습니다.
START TRANSACTION;
SELECT quantity INTO @stock FROM products WHERE id = 1;

-- A가 아래 내용을 먼저 끝내고, 그다음 B가 진행합니다.
UPDATE products SET quantity = @stock - 1 WHERE id = 1;
-- 각 요청은 서로 다른 주문 ID로 주문을 저장합니다.
COMMIT;
```

When B's UPDATE runs, the actual inventory is already 0. But `@stock` still holds the initially read 1. Instead of subtracting 1 from the current DB quantity, B saves 0 calculated from the old value again. The number of changed rows was 0, but the faulty implementation did not check this and saved the order.

| Isolation level | Values read by A/B | Final inventory | Total ordered quantity |
| --- | --- | --- | --- |
| REPEATABLE READ | 1 / 1 | 0 | 2 |
| READ COMMITTED | 1 / 1 | 0 | 2 |

Writes themselves also use locks. But that does not automatically rerun B's earlier decision to allow the order. Here, the two UPDATEs did not even need to overlap. The problem arose simply because both requests completed their reads before the first modification.

That does not mean transactions are unnecessary. In a separate experiment, executing ROLLBACK immediately after decrementing inventory restored the inventory that appeared as 0 to A back to 1 as observed from another connection. Transactions define which changes are saved or canceled together. We also needed to define <strong>which values competing requests would base their decisions on</strong>. [COMMIT and ROLLBACK](<https://dev.mysql.com/doc/refman/8.4/en/innodb-autocommit-commit-rollback.html>)

Changing to READ COMMITTED produced the same result, because B reused the value it had already stored. Then would reading the inventory again before updating be enough? First, we need to understand what reading again means in InnoDB.

## 2\. Reading again does not always show new inventory

After A read inventory 1, B changed it to 0 and committed. A then ran an ordinary SELECT again. Under the default isolation level, REPEATABLE READ, it still saw 1. Adding `FOR UPDATE` on the same connection returned 0 this time.

| A's isolation level | First ordinary read | Ordinary read after B commits | Locking read after B commits |
| --- | --- | --- | --- |
| REPEATABLE READ | 1 | 1 | 0 |
| READ COMMITTED | 1 | 0 | 0 |

To understand the difference, distinguish 'the value currently stored' from 'the value visible to this read.' InnoDB retains undo information so it can reconstruct rows from before a change. MVCC, or multiversion concurrency control, supplies a version matching the visibility rules at read time. It does not copy the entire DB for each transaction. [InnoDB Multi-Versioning](<https://dev.mysql.com/doc/refman/8.4/en/innodb-multi-versioning.html>)

An ordinary consistent read under REPEATABLE READ keeps using the snapshot established by the first consistent read. Since B committed after A began reading, the second ordinary read still sees the old inventory of 1. Under READ COMMITTED, each statement uses a new snapshot, so the second read saw 0. A itself did not modify data in this experiment. [Consistent Nonlocking Reads](<https://dev.mysql.com/doc/refman/8.4/en/innodb-consistent-read.html>)

Reading consistent values within the same transaction is useful. If other requests' changes keep mixing into repeated reads, interpreting data against a single baseline can be difficult. But <strong>being able to see the inventory you read does not mean that inventory has been reserved for your order.</strong> Other requests can still modify the product.

Locking reads serve a different purpose. In this experiment, B had already committed, so `FOR UPDATE` read inventory 0. It is difficult to explain this result if we treat reading and protecting a row to be updated for an order as the same operation as repeatedly reading an earlier snapshot.

Seeing a new value under READ COMMITTED also does not eliminate the gap between reading and updating. Another request can take the inventory after the read finishes. We need to go beyond increasing the number of reads and find <strong>a way to handle other modifications intervening while inventory is checked and the order is allowed</strong>.

## 3\. Making the next modification wait while inventory is evaluated

The earlier problem was that two requests read the same inventory of 1 and each judged that it could accept an order. So until the request that checks inventory first saves its order, other requests modifying the same product must be prevented from intervening.

`FOR UPDATE` acquires a lock while reading the row to be modified. While A holds the lock, B's locking read waits, so B checks inventory after A finishes. In the experiment, when A read inventory 1 and kept its transaction open, B's `FOR UPDATE` on the same product did not return immediately.

![02-locking-read.png](/images/rilog/368/02.webp)

I did not infer a lock wait merely from the delayed response. From an observer connection C, I queried `performance_schema.data_locks` and `data_lock_waits`. For key 1 in the product's PRIMARY index, A held an `X,REC_NOT_GAP` lock, and B was waiting for a lock of the same mode.

| Request | Target | Status |
| --- | --- | --- |
| A | PRIMARY record for product 1 | GRANTED |
| B | PRIMARY record for product 1 | WAITING |

When A decremented inventory, saved the order, and committed, B's read finished. B read 0 and did not save an order. Final inventory was 0, with one order. The difference from the first implementation was <strong>protecting the row needed for the decision from the time it was read</strong>.

The lock is not released when A receives the query result. To protect the interval between reading inventory and saving the order, the lock must remain held during that interval. Locks acquired in this explicit transaction remain until COMMIT or ROLLBACK. [Locking Reads](<https://dev.mysql.com/doc/refman/8.4/en/innodb-locking-reads.html>)

By contrast, C's ordinary SELECT returned inventory 1 without waiting for A to finish. C was not trying to acquire a lock on the row to modify it; it read a committed version visible to itself through MVCC. The snapshot reads discussed in the previous section were at work here too.

What we checked here was one existing primary-key record. Unlike the record lock used for an exact unique-key lookup, a range query can involve gap locks that restrict inserts into empty intervals, or next-key locks protecting both a record and the interval before it. To judge lock scope, examine not only the number of returned rows but also the index and actual access path. [Locks set by SQL statements](<https://dev.mysql.com/doc/refman/8.4/en/innodb-locks-set.html>)

## 4\. Checking and decrementing in one statement

The decision for this order is simple: if at least one item remains, subtract one. Then instead of having the application read and compare the value, we can put that condition in the update SQL.

```sql
UPDATE products
SET quantity = quantity - 1
WHERE id = 1 AND quantity >= 1;
```

![03-conditional-update.png](/images/rilog/368/03.webp)

A's UPDATE changed one row. When B ran before A committed, B's UPDATE waited this time. After A saved the order and committed, B returned 0 rows. Inventory had become 0 and no longer satisfied `quantity >= 1`.

By <strong>saving the order only when one row is affected</strong>, we no longer need to allow orders based on a stale read. The product already exists in this experiment. Without that assumption, 0 rows could mean a missing product as well as insufficient inventory.

There is one fewer SELECT, but the lock remains. The two UPDATEs can still conflict because they modify the same row. Describing conditional updates as 'a method without locks' would contradict what was observed. What changed is that the basis for allowing an order moved from a read value to whether the update succeeded.

Inventory decrement and order insertion must still share a transaction. If the UPDATE succeeds but saving the order fails and the inventory change remains, another inconsistency arises. This is why I also checked that a ROLLBACK after decrementing restored inventory to 1 and the order count to 0.

Following the controlled two-request experiment, I sent 1,000 orders for 100 items using 16 concurrent workers. In three runs for each method, both recorded <strong>100 successes, 900 insufficient-inventory results, and 0 DB errors</strong>. Final inventory was always 0, and the relationship between orders and inventory held. With evidence that both methods work safely under these conditions, we can now compare their processing costs.

## 5\. Both methods wait when requests concentrate on one product

Conditional updates remove one inventory read. Does throughput increase proportionally as we add workers sending orders concurrently? Requests modifying the same product can still wait for earlier transactions, so we need to examine both the effect of reducing SQL statements and the issue of requests concentrating on one row.

I therefore compared requests concentrated on one product with requests evenly distributed across 100 products. This distinguishes competition over the same row from situations where different rows can be modified. I varied concurrent workers between 1 and 16 while keeping order insertion and transaction boundaries the same in both implementations.

The metrics are successful orders per second and p95 request latency. <strong>p95 means 95% of measured requests completed within that time</strong>. Even if throughput increases, some requests can wait longer, so we examine both. Each table below shows the median of three measurements. The p95 is also the median of the per-run p95 values, not a percentile calculated by combining requests from all runs.

<strong>Successful orders per second: higher values mean more orders processed in the same time.</strong>

| Products | Concurrent workers | FOR UPDATE (orders/s) | Conditional UPDATE (orders/s) |
| --- | --- | --- | --- |
| 1 | 1 | 363.8 | 442.6 |
| 1 | 16 | 449.9 | 543.3 |
| 100 | 1 | 362.6 | 424.5 |
| 100 | 16 | 1,727.4 | 2,158.8 |

<strong>p95 request latency: lower values mean requests finish in less time.</strong>

| Products | Concurrent workers | FOR UPDATE (ms) | Conditional UPDATE (ms) |
| --- | --- | --- | --- |
| 1 | 1 | 4.36 | 3.63 |
| 1 | 16 | 43.73 | 36.73 |
| 100 | 1 | 4.29 | 3.83 |
| 100 | 16 | 12.01 | 9.52 |

I provided ample inventory for each product so that quickly completed insufficient-inventory requests would not enter the throughput figures. For each condition, I warmed up with 500 requests, reset, then measured 2,000 requests, repeating three times while alternating implementation order. Latency was measured from just before BEGIN through COMMIT, excluding connection creation, connection pooling, and HTTP waiting. All 48,000 requests across 24 measured runs committed, with no DB errors or inventory inconsistencies.

In this environment, conditional updates had higher throughput and lower request latency. But both methods experienced longer waits when 16 workers targeted one product. Even conditional updates went from about 443 orders/s with one worker to about 543 orders/s with 16, while p95 rose from 3.63ms to 36.73ms.

When the same 16 workers spread their work over 100 products, conditional updates achieved about 2,159 orders/s and locking reads about 1,727 orders/s. Client and server costs remain even when work is spread across products, but the result is consistent with reducing concentrated contention while waiting to modify the same row.

Conditional updates remove one inventory read from the success path. Including BEGIN and COMMIT, this implementation uses five round trips with locking reads and four with conditional updates. This difference can affect cost, but the measurements alone do not isolate the contributions of SQL round trips, server execution, and lock waiting.

These figures also come from Docker on an M1 Pro, limited to 2 CPUs and 2GiB of memory, with a Python client. Each worker sends its next request after receiving a response. The figures cannot be reused as maximum throughput for a real service with its arrival rate, network latency, and other queries. The conclusion here is that <strong>even after removing one read, contention from updates concentrated on one product needs separate attention</strong>.

## 6\. Holding locks longer matters more than the lock type

If requests concentrating on one product are unavoidable, the next thing to reduce is how long each request holds the lock. Even when a conditional UPDATE finishes quickly, the lock remains until COMMIT. So if lengthy preparation unrelated to the DB happens after the decrement, the next request must wait for that preparation too.

Moving that preparation before BEGIN lets multiple requests prepare concurrently. Only the interval for checking inventory and saving the order is protected by the lock.

![04-lock-duration.png](/images/rilog/368/04.webp)

To examine the difference, I replaced preparation independent of DB state with a 20ms wait, comparing the same work after UPDATE and before BEGIN. Other conditions were fixed: 200 requests for one product, 16 workers, and conditional UPDATE. Each case ran three times. The 20ms was an experimental input chosen to expose the impact of holding locks longer, not a real external API's response time.

| Preparation location | Successful throughput (orders/s) | p95 request latency (ms) |
| --- | --- | --- |
| After UPDATE | 28.6 | 584.28 |
| Before BEGIN | 455.0 | 42.07 |

The comparison would be unfair if moving preparation outside also removed its time from measurement. So this time both cases measured <strong>from the start of preparation through COMMIT</strong>. That is why the measurement boundary differs from the previous section's BEGIN-to-COMMIT interval. The table gives medians of three throughput values and per-run p95 values. All runs completed 200 successful requests and maintained the relationship between inventory and ordered quantities.

Inside a transaction, preparation is included in the time the product lock is held. The next request must wait even if that work does not use the DB. Outside the transaction, preparation can overlap, and prepared requests compete over a short inventory-processing interval.

But that does not mean all checks can move outside. If preparation depends on DB state it has read, that state may change during the wait. Here, only work without such dependencies was moved, and <strong>the inventory condition check and order insertion remained in the same transaction.</strong> Since the experiment did not cover external payments, these results do not resolve duplicate payment execution or compensation issues.

## 7\. With two products, lock ordering matters too

So far, two requests have waited over a single product. An order containing two products changes the situation. While A locks product 1 and waits for product 2, B can lock product 2 and wait for product 1. This is a circular wait in which neither can acquire its next required lock.

![05-deadlock-order.png](/images/rilog/368/05.webp)

Reproducing this sequence with two connections made MySQL return <strong>error 1213</strong> to one transaction and allow the other to proceed. The test did not predetermine which request would be the victim. The deadlock was also recorded in `SHOW ENGINE INNODB STATUS`.

Conversely, when both requests locked product 1 and then product 2, B waited from the first product. A could acquire both products and finish, after which B proceeded. Both transactions committed in this comparison. It eliminates a particular cycle; it does not guarantee the absence of deadlocks across all tables and indexes. [Access ordering to reduce deadlocks](<https://dev.mysql.com/doc/refman/8.4/en/innodb-deadlocks-handling.html>)

Even with consistent access ordering, we need to define what a request that receives a deadlock error should rerun. If processing the second product fails, the retry scope depends on whether the first product's decrement and order insertion remain.

InnoDB <strong>rolls back the entire transaction</strong> chosen as the deadlock victim. So rerunning only the failed SQL statement would omit the first product's processing, which was also canceled. Everything from inventory checking through order insertion must run again in a new transaction. [Rollback scope by error](<https://dev.mysql.com/doc/refman/8.4/en/innodb-error-handling.html>)

In the experiment, each product began with inventory 2, and A/B decremented their respective first products and saved order rows before deadlocking. The victim's previously saved order row disappeared too. After the surviving request committed, both products had inventory 1. Rerunning the failed request's entire operation in a new transaction left both products with inventory 0 and total ordered quantity 2, preserving the original relationship.

This retry was performed once, with no external side effects. Real code must limit retry attempts in view of possible repeated conflicts. Putting the wait between attempts before starting a new transaction also avoids unnecessary waiting inside the inventory-processing interval.

## 8\. Choosing conditional updates first for this inventory operation

It is easy to think preventing negative inventory and committing inventory changes together with orders is enough. But arranging for two requests to read the same 1 showed that even a final quantity of 0 could coexist with two orders. What needed checking was more than a single number: <strong>the process of allowing orders based on that number</strong>.

A conditional UPDATE fits operations like this, where a quantity in one row is decremented subject to a condition. The condition can be expressed in SQL, and the affected-row count clearly determines whether to save an order. In the experiment, it removed one read while maintaining the same consistency.

If subsequent decisions depend on several values read, however, consider protecting the necessary data with `FOR UPDATE`. Either choice leaves lock scope and holding time to address. Handling multiple rows also requires designing access order and retries of the entire transaction together.

| Operation conditions | Approach to consider first | What to check alongside it |
| --- | --- | --- |
| Conditionally decrement one row's inventory | Conditional UPDATE | Updated-row count, same transaction as order |
| Make subsequent decisions while protecting values read | FOR UPDATE | Lock scope, holding time |
| Handle multiple products in one order | Consistent access order and failure handling | Full rollback, bounded retries |

I do not want to take 'conditional updates are always faster' as this article's conclusion. The three more lasting criteria are <strong>which value the decision uses, how far that decision is protected, and what must be rerun after failure</strong>. Establishing these first lets us choose locking syntax and transaction boundaries to fit the work.

<p class="rilog-empty-block" aria-hidden="true"><br /></p>
