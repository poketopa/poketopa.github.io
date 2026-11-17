---
title: "[Knot] How We Chose Knot's Transcription Models"
description: "Comparing the cost and quality of external STT APIs and local Whisper"
publishedAt: 2026-10-10
category: Development
tags: ["Knot", "STT", "Whisper"]
cover: "/images/rilog/331/12.webp"
source:
  platform: Rilog
  id: "331"
  url: https://www.rilog.kr/@knot/posts/331
draft: false
---

### <strong>Recording, documents, and exploration are essential elements of the Knot project.</strong>

This post records why we chose local models, the roles of the models needed for transcription, and the improvements we tried while inspecting the results ourselves.

> Transcription: the process of converting speech into text / STT (Speech-to-Text)

<p class="rilog-empty-block" aria-hidden="true"><br /></p>

<strong>Here is the table of contents.</strong>

1. Why we did not use an external API
2. Which models did transcription require?
3. Initial transcription results and attempts to improve them
4. Knot's current transcription setup

<p class="rilog-empty-block" aria-hidden="true"><br /></p>

## 1\. Why we did not use an external API

Our options were <strong>external APIs and local models</strong>.

<strong>APIs</strong> offered good transcription quality and required fewer improvements on our part, reducing implementation effort. <br />In return, we had to pay according to the length of the recorded audio.

<strong>Local models</strong> run directly on equipment we manage. <br />Among the candidates we compared at the time, their transcription quality was lower than the APIs', but we could use them without separate transcription API fees.<br />We would have to improve the quality and operate the models ourselves.

The API prices we compared were as follows.

| Approach | Billing rate at the time | Cost to transcribe one hour of recording |
| --- | --- | --- |
| CLOVA Speech | KRW 5 per 15 seconds | About KRW 1,200 |
| OpenAI API | $0.0045 per minute | About KRW 370 |

A few hundred to a thousand won an hour might seem reasonable. <br />But when we plugged in actual usage, API costs were higher than we had expected.

Our team alone held and recorded several hours of meetings a day. <br />Assuming three hours a day for twenty days a month, a single team would need sixty hours of audio processed monthly.

| Usage example | OpenAI API | CLOVA Speech |
| --- | --- | --- |
| One team recording 3 hours a day, 20 days a month | About KRW 22,200/month | About KRW 72,000/month |
| Ten teams recording the same amount | About KRW 222,000/month | About KRW 720,000/month |

If ten teams recorded three hours each weekday, the estimated CLOVA cost was <strong>about KRW 720,000 per month</strong>. <br />We judged that we could not sustain that cost for a project operating without revenue.

So we chose local models without transcription API fees and decided to improve their weaker quality ourselves. <br />Equipment, power, and operational burdens remained, but we could reduce API costs that grew with usage.

I had been eyeing a Mac mini for a while, so I used this opportunity as an excuse to <strong>buy a used Mac mini</strong>.

![](/images/rilog/331/01.webp)

![](/images/rilog/331/02.webp)

<p class="rilog-empty-block" aria-hidden="true"><br /></p>

## 2\. Which models did transcription require?

![](/images/rilog/331/03.webp)

Knot needed not only to turn meeting speech into text, but also to record who spoke and when. <br />To do that, we <strong>connected models</strong> serving the following roles.

1. A model to find segments containing speech
2. A model to transcribe what was said
3. A model to distinguish who said it

A total of <strong>four models</strong> analyze the same audio along two paths. <br />One produces text and timestamps; the other produces speakers and speech segments. <br />Aligning the times in the two results creates a transcript organized by speaker.

<p class="rilog-empty-block" aria-hidden="true"><br /></p>

### Finding segments containing speech

The process of finding segments containing speech in audio is called VAD. <br />Knot currently uses `Silero VAD`.

<em><strong>Why do we need VAD?</strong></em>

Meeting recordings include silence and noise as well as speech. <br />Speech recognition models such as `Whisper` sometimes output words that were never spoken in these segments. <br />Even with faint noise, the speech recognition model merely judges `Which words does this sound most resemble?` <br />This is called <strong>hallucination</strong>: sentences can appear in segments where no one said anything.

We therefore need to first find segments containing speech to transcribe. <br />`Silero VAD` returns the start and end times of segments it judges to contain human speech. <br />Based on that information, we extract the corresponding audio and pass it to the speech recognition model.

![](/images/rilog/331/04.webp)

<p class="rilog-empty-block" aria-hidden="true"><br /></p>

### Turning speech into text

What VAD finds are segments containing speech. <br />We still <strong>do not know what the person said.</strong><br />`Whisper` turns those sounds into text.

Whisper reads features extracted from audio and generates corresponding text pieces in sequence. <br />A simplified version of the sound-to-text flow looks like this.

![](/images/rilog/331/05.webp)

At this point, we know what was said and when. <br />But speaker diarization requires separately distinguishing who said it.

<p class="rilog-empty-block" aria-hidden="true"><br /></p>

### Finding speech segments for each speaker

<em><strong>If VAD finds speech, couldn't we use it directly to distinguish speakers too?</strong></em>

VAD tells us whether speech is present at a given time. <br />Even if two people take turns speaking, the mere presence of speech does not tell us whether the person has changed.

So we also pass the same audio to `pyannote segmentation`. <br />This model estimates when each speaker is talking within short audio chunks. <br />It also analyzes people taking turns or multiple people speaking at once.

![](/images/rilog/331/06.webp)

But there is <strong>no guarantee that the speaker numbers in these segments refer to the same people throughout the meeting</strong>. <br />We also need to compare whether a remark early on and another much later belong to the same voice.

<p class="rilog-empty-block" aria-hidden="true"><br /></p>

### Grouping separated remarks under one speaker

Someone may speak early in the meeting, listen to others, and then speak again. <br />Even though the remarks are separated, we need to connect them as the same person's speech.

`ERes2Net` extracts voice characteristics for this purpose. <br />It converts speech audio into an array of numbers, called a <strong>speaker embedding</strong>.

We then compare those arrays and group remarks with similar voice characteristics. <br />`ERes2Net` extracts the features; the calculation that groups the same speaker using those features is performed separately.

![](/images/rilog/331/07.webp)

This distinguishes the different voices within a meeting as A, B, and so on.

<p class="rilog-empty-block" aria-hidden="true"><br /></p>

### Connecting them on a shared timeline

Now we have words and timestamps on one side, and speech segments for each speaker on the other.

<em><strong>How do we connect the two results?</strong></em>

We check whether the time a word occurs overlaps with the time a speaker was talking. <br />Here is an illustrative example.

![](/images/rilog/331/08.webp)

Both sets of times must refer to the original audio. <br />Seven seconds into audio with silence removed might correspond to ten seconds in the original.

Knot aligns word timestamps to the original audio before connecting them with speaker information. This creates a transcript containing who said what and when.

<p class="rilog-empty-block" aria-hidden="true"><br /></p>

## 3\. Initial transcription results and attempts to improve them

After connecting the models according to their roles, we needed to check how well they transcribed real meetings.

### Model performance too poor to use

Initially, we used the `faster-whisper small` model and `sherpa-based speaker diarization`.

In the initial experiment, transcribing a 57-minute-36-second meeting took about sixteen minutes. <br />The program ran to completion and produced a transcript file.

But reading the result showed it was difficult to use as it was. <br />A meeting with around five participants was split into <strong>51</strong> speaker clusters. <br />The same person's remarks were divided among multiple speakers, making it difficult to tell who had said what.

<p class="rilog-empty-block" aria-hidden="true"><br /></p>

![](/images/rilog/331/09.webp)

There were also <strong>problems with transcription quality</strong>. <br />Technical terms were awkward, and some expressions made it difficult to reconstruct the context.

Here is part of the output at the time.

```text
[00:00:04.160 - 00:00:10.580] Speaker 1
분석이요? 이 케이크입니다 루트롤이라는 거리 이런 거를

[00:00:13.070 - 00:00:19.070] Speaker 1
CRU들의 카라멜으로 된다고 생각을 하고요 그러니까 예를 들어 팀의 API에서 경로를 받아와

[00:00:19.750 - 00:00:21.850] Unknown
어쩌면 어쩌면 어쩌고 루트로
```

This experiment had no reference transcript, so we could not establish the original wording behind each expression. But from this output alone, it was difficult to understand which technologies and behaviors the meeting had discussed.

Even if changing the settings changed the results, we needed a reference against the original audio to judge whether they had actually improved.

<p class="rilog-empty-block" aria-hidden="true"><br /></p>

### Listening and creating a reference ourselves

![](/images/rilog/331/10.webp)

So I listened to the recordings and corrected the transcripts myself.<br />I listened to <strong>about ten hours of meeting audio</strong>, distinguishing who spoke and what they said.<br />Rather than filling in hard-to-hear speech with guesses, I separately checked technical terms, numbers, and negations—parts where a transcription error could change the meeting's meaning.

<p class="rilog-empty-block" aria-hidden="true"><br /></p>

### What if we supplied a glossary and the speaker count?

While manually checking transcripts and speaker assignments, I wondered whether providing information about the meeting to the models beforehand might change the results.

First, I supplied meeting vocabulary as a <strong>glossary</strong>. <br />It contained expressions common in development meetings, such as OAuth, GitHub, and redirects. <br />Rather than providing the correct sentences, this gave hints about which words might appear.

For diarization, I also supplied <strong>how many</strong> people were actually speaking. <br />I compared distinguishing voices without knowing the number of people against doing so with the speaker count supplied.

Providing a glossary and speaker count noticeably improved transcription quality and speaker diarization. <br />Besides replacing models, adjusting the information supplied could improve results.

<p class="rilog-empty-block" aria-hidden="true"><br /></p>

### However,

We <strong>did not apply</strong> this approach directly to the service.

In the experiment, I could simply prepare the glossary and enter the speaker count. <br />But in the service, users would need to repeat that process for every recording.

Someone arriving to record a meeting would first have to organize the words likely to appear and enter the speaker count—a hassle. <br />Even if transcription quality improved, we wanted to avoid an approach that <strong>hurt UX</strong> by adding preparation before recording could begin.

So we did not include manual glossary and speaker count entry in the default user flow. <br />Afterward, we continued improving transcription and diarization quality without advance input.

## 4\. Knot's current transcription setup

As of October 30, 2026, Knot's transcription setup is as follows.

| Role | Model | Runtime tool |
| --- | --- | --- |
| Finding speech segments | Silero VAD v5.1.2 | whisper.cpp |
| Turning audio into text | Whisper large-v3, Q5\_0 quantization | whisper.cpp |
| Speaker activity analysis | pyannote segmentation 3.0 | sherpa-onnx |
| Voice feature extraction | ERes2Net | sherpa-onnx |

![](/images/rilog/331/11.webp)

<p class="rilog-empty-block" aria-hidden="true"><br /></p>

These models run on the Mac mini AI server. <br />When the browser collects and uploads audio, the API server manages processing jobs and passes them to the AI server. <br />The API server receives and stores the results and connects them to subsequent document generation.

This post covered why we chose local models, the transcription structure, and our initial improvement attempts. In the next post, I will discuss how we identified and improved transcription errors and speaker diarization problems.
