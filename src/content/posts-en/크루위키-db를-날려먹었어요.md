---
title: "I Wiped Out CrewWiki's Database"
description: "Recovering a DB from an RDS snapshot after an AWS account suspension"
publishedAt: 2026-07-25
category: Development
tags: ["크루위키", "데이터베이스", "문제 해결"]
cover: "/images/rilog/244/10.webp"
source:
  platform: Rilog
  id: "244"
  url: https://www.rilog.kr/@homo_scribens/posts/244
draft: false
---

Original: [Read on Rilog](https://www.rilog.kr/@homo_scribens/posts/244)

## A bolt from the blue

![](/images/rilog/244/01.webp)

I received a message saying <strong>all CrewWiki servers had stopped</strong>.

![](/images/rilog/244/02.webp)

When I checked AWS, the account was suspended, and all four EC2 instances were off.

![](/images/rilog/244/03.webp)

The AWS free plan on the account was credit-based, and the remaining credit was $0.

I had not been properly checking the billing notifications sent to the team account...

![](/images/rilog/244/04.webp)

We would have to pay to keep running the service.

I asked the team to vote on whether to switch to a paid plan, and the decision took about a week.

![](/images/rilog/244/05.webp)

The servers were off for the week while the vote was underway, and CrewWiki disappeared from Google..

## The lost database

We decided to switch AWS to a paid plan. Now we needed to turn the servers back on.

![](/images/rilog/244/06.webp)

But even after restarting EC2, the service did not open.

This time, RDS was the problem.

![](/images/rilog/244/07.webp)

The existing DB was in the `Inaccessible-encryption-credentials` state.

It was not simply stopped; it was in a state that <strong>could not be recovered</strong> by restarting the existing instance.

<p class="rilog-empty-block" aria-hidden="true"><br /></p>

I was genuinely terrified.

I remember the backend team huddling together, trembling at the thought that we had wiped out our predecessors' data..

## Very, very, very, very fortunately

Four usable snapshots remained.

We preserved the existing DB and used a new DB restored from a snapshot.

![](/images/rilog/244/08.webp)

Before changing the connection settings and deployment, we also took an additional safety snapshot of the restored DB.

## One hurdle after another

The new DB was available, but the API still returned `502 Bad Gateway`.

The backend logs showed the following error.

```text
running=true status=running exit_code=0 restart_count=30 error=""
character_encoding=UTF
curl: (56) Recv failure: Connection reset by peer
http_status=000
Unsupported character encoding 'UTF'
```

While updating the connection details for the new DB, I had entered the wrong encoding value in the JDBC URL.

```text
characterEncoding=UTF
```

I changed the value above to the following.

```text
characterEncoding=UTF-8
```

After updating `PROD_DB_URL` and redeploying, I personally confirmed that CrewWiki could be accessed normally.

## What I learned

In this incident, we were able to recover thanks to the automatically saved snapshots that remained.

If the timing had been different, we could have lost all the data.

<p class="rilog-empty-block" aria-hidden="true"><br /></p>

I realized how important it is to create <strong>snapshots</strong> regularly.

Also, the reason we failed to respond this time was not server load or monitoring; it was simply that we had not checked our <strong>email</strong>.

I felt it was important to assign someone to check and act on those messages, and to build a <strong>notification system</strong>.

<p class="rilog-empty-block" aria-hidden="true"><br /></p>

![](/images/rilog/244/09.webp "CrewWiki is back")
