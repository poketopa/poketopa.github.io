---
title: "CSV 한 줄로는 실험을 믿을 수 없었다"
description: "245개 기록을 다시 감사하면서, 결과보다 결과가 만들어진 경로를 보존해야 한다는 것을 배웠다."
publishedAt: 2026-08-19
updatedAt: 2026-08-21
category: Development
tags: ["Logging", "Reproducibility", "CAS"]
draft: false
---
## 시작하며

처음 만든 Harness에는 245개의 기록이 있었다.

CSV에서 성공 여부를 세고 비교하기에는 충분해 보였다.

그런데 기록을 다시 감사하면서 막혔다.

같은 source가 여러 행에서 재사용됐고, 정확한 model·prompt·evaluator hash가 없는 행도 있었다. 245개 중 129개는 독립 생성 증거로 보기 어려웠고, 23개는 출처 정보가 부족해 판정할 수 없었다.

결과는 남아 있었지만, 그 결과가 어떻게 만들어졌는지 복원할 수 없었다.

## CSV가 놓치는 것

CSV는 최종 숫자를 보여준다.

하지만 아래는 거의 보여주지 못한다.

- 어떤 입력으로 돌렸는가
- 어떤 버전의 프롬프트였는가
- 어떤 evaluator를 사용했는가
- 도중에 어떤 이벤트가 있었는가
- 결과 파일이 중간에 바뀌지 않았는가

즉, CSV는 "무슨 일이 있었는가"가 아니라 "마지막에 무엇이 보였는가"만 남긴다.

그러면 나중에 같은 실험을 다시 재현하기 어렵다.

> **그림 필요:** CSV 단일 파일과 manifest / events / artifacts 증거 묶음을 비교하는 그림

## 한 행을 증거 묶음으로 바꿨다

그래서 기록을 세 종류의 상태 파일과 실제 artifact directory로 나눴다.

- `manifest.json` : 이 run이 무엇인지, 어떤 상태인지
- `events.jsonl` : 도중에 어떤 변화가 있었는지
- `artifacts.json` : 어떤 artifact가 사용됐고, 어떤 hash를 가졌는지
- `artifacts/` : hash로 식별한 실제 파일 byte

이렇게 나누면 결과와 과정이 분리된다.

결과는 결과대로, 과정은 과정대로 읽을 수 있다.

```text
runs/{runId}/
├── manifest.json
├── events.jsonl
├── artifacts.json
└── artifacts/
    └── <sha256 digest>
```

`manifest.json`에는 run id, 입력 버전, evaluator 버전, 시작·종료 시각, 최종 상태를 넣었다. `events.jsonl`에는 시작, 단계 전환, 오류, 종료를 순서대로 append했다. `artifacts.json`은 실제 파일의 논리적 이름과 hash를 가리키고, `artifacts/`에는 입력과 출력 byte를 보관했다.

CSV는 이 묶음에서 파생할 수 있는 요약본이 됐다. 반대로 CSV 한 줄만으로는 이 묶음을 복원할 수 없다.

## 왜 hash가 필요했나

파일 이름은 믿을 수 없다.

같은 이름이라도 내용이 다를 수 있기 때문이다.

그래서 파일을 이름이 아니라 hash로 묶었다.

이 구조의 장점은 단순하다.

- 어떤 파일이 실제로 사용됐는지 알 수 있다
- 중간에 내용이 바뀐 파일을 다시 걸러낼 수 있다
- 같은 이름의 다른 버전을 실수로 섞지 않을 수 있다

결국 실험은 "그럴듯한 파일 이름"이 아니라 **실제 byte** 위에서 돌아가야 한다.

여기서 hash도 두 종류를 구분할 필요가 있었다.

- source tree hash: 어떤 소스 내용으로 실행했는지 식별한다
- archive byte hash: 실제 전달된 압축 파일의 byte가 같은지 식별한다

소스가 같아도 압축 시각이나 메타데이터 때문에 archive hash는 달라질 수 있다. 무엇의 동일성을 확인하려는지 먼저 정해야 했다.

그리고 hash가 있다고 파일이 진실해지는 것은 아니다. hash는 내용이 같은지 확인하는 식별자에 가깝다. 누가 기록을 바꿀 수 있는지, 서명과 보존 정책은 어떤지까지 있어야 변조에 더 강해진다.

## 중간에 죽어도 과거를 추측하지 않게 했다

내가 가장 신뢰하게 된 부분은 append-only 방식이었다.

기록을 덮어쓰지 않고, 계속 쌓는 방식이다.

SQLite의 WAL이 변경 기록을 별도 로그에 먼저 쌓는 것처럼, 이 구조도 event를 먼저 남기고 마지막에 manifest 상태를 확정하는 쪽에 가깝다.

그렇게 해야 도중에 프로세스가 죽어도, 무엇이 끝났고 무엇이 끝나지 않았는지를 다시 판단할 수 있다.

물론 JSONL을 쓴다고 자동으로 안전해지는 것은 아니다. event append, artifact의 atomic write, hash 확인, 마지막 manifest 갱신이 하나의 규칙으로 묶여야 한다.

artifact 자체는 content-addressed storage처럼 hash를 key로 삼을 수 있다. 동일한 byte는 한 번만 저장하고, `artifacts.json`은 논리적 이름과 hash를 연결한다. manifest는 이 artifact index의 hash까지 묶는다. 그러면 run이 많아져도 어떤 파일을 썼는지 추적하기 쉬워진다.

이 구조가 실제로 버티는지도 따로 확인했다.

- event가 일부만 기록된 시점에 process가 죽는 경우
- 오래된 writer가 이미 바뀐 상태를 덮으려는 경우
- artifact가 빠지거나 CAS 내용이 손상된 경우
- symlink로 evidence directory 밖을 가리키는 경우

각 경우에 정확한 이전 상태나 다음 상태로 복구할 수 없으면 manifest commit을 거부하도록 regression test를 만들었다.

## 정리

CSV는 결과를 보기에는 편하다.

하지만 실험을 믿으려면 결과만으로는 부족하다.

실험을 믿으려면 최소한 다음이 같이 있어야 했다.

- 무엇을 돌렸는지
- 어떤 순서로 변했는지
- 어떤 파일이 실제로 쓰였는지
- 중간에 깨졌는지

그래서 나는 CSV를 버리지는 않았지만, CSV만 믿지는 않게 되었다.

이 구조도 결과가 옳다는 것을 증명하지는 않는다. 대신 **어떤 결과가 어떻게 만들어졌는지 다시 확인할 길**을 남겨준다.

## 참고

- [SQLite Write-Ahead Logging](https://www.sqlite.org/wal.html)
- [SQLite Atomic Commit](https://www.sqlite.org/atomiccommit.html)
- [Git hash-object](https://git-scm.com/docs/git-hash-object)
- [SLSA Provenance](https://slsa.dev/spec/v1.2/provenance)
- [NIST Cloud of Reproducible Records](https://www.nist.gov/programs-projects/cloud-reproducible-records)
- [spring-harness-benchmark data contract](https://github.com/poketopa/spring-harness-benchmark/blob/main/docs/harness-v2/data-contract.md)
