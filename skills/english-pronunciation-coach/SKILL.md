---
name: english-pronunciation-coach
description: "English pronunciation coach for beginners. Analyze any English sentence and identify connected speech (linking, elision, assimilation), weak forms, word/sentence stress, intonation patterns, and provide a complete DJ (Daniel Jones) phonetic transcription. Use when users ask to analyze pronunciation of English sentences, want to learn how a sentence sounds in natural speech, ask for phonetic transcription, or want to understand connected speech patterns like linking and weak forms."
---

# English Pronunciation Coach

Analyze English sentences for natural pronunciation features and produce DJ phonetic transcriptions.

**📖 Complete phonetics reference**: See [references/pronunciation-rules.md](references/pronunciation-rules.md) for the DJ phonemic chart, weak forms table, connected speech rules, stress patterns, and intonation guide. Consult this file when analyzing any sentence.

---

## Workflow

### 1. Receive Sentence

Accept the English sentence from the user. If the user provides a Chinese request with an English sentence embedded, extract the English sentence for analysis.

### 2. Load Reference

Read [references/pronunciation-rules.md](references/pronunciation-rules.md) to consult:
- **DJ phonemic chart** — for accurate phonetic symbols
- **Weak forms table** — for function word reductions
- **Connected speech rules** — for linking, elision, assimilation, gemination, intrusive /r/
- **Stress rules** — for word stress placement
- **Intonation patterns** — for sentence-level melody

### 3. Analyze the Sentence

For each sentence, identify:

**a) Weak Forms** — Mark all function words using their weak form:
- Articles, pronouns, prepositions, conjunctions, auxiliaries
- Note any function words that stay strong (for emphasis or contrast)

**b) Connected Speech** — Identify and label:
- **C→V linking**: consonant at end of word links to vowel at start of next
- **V→V linking**: /j/ or /w/ glide inserted between vowels
- **Elision**: dropped sounds (e.g., /t/ in "next day")
- **Assimilation**: sound changes at word boundaries (e.g., /t/+/j/→/tʃ/)
- **Gemination**: identical consonants merged across word boundaries
- **Intrusive /r/**: inserted between certain vowels in non-rhotic speech

**c) Word Stress** — Mark primary (ˈ) and secondary (ˌ) stress for multi-syllable words.

**d) Sentence Stress** — Identify which content words receive stress and which function words are unstressed. English is stress-timed, so mark the rhythm.

**e) Intonation** — Determine the intonation pattern based on sentence type:
- Statements, wh-questions, commands → Falling ↘
- Yes/no questions, lists (non-final), uncertainty → Rising ↗
- Implication, correction, reservation → Fall-rise ↘↗

### 4. Produce Output

Use this template for the response:

```
## 原句
[Original sentence]

## 连读 (Connected Speech)
[List each connected speech feature found]

## 弱读 (Weak Forms)
[Table or list: word → strong form → weak form used]

## 重音 (Stress)
**词重音 (Word Stress)**: [Marked words with ˈ and ˌ]
**句重音 (Sentence Stress)**: [.Stressed. words in .capital. or .bold.]

## 语调 (Intonation)
[Describe the intonation pattern with ↘ ↗ ↘↗ markers over the sentence]

## DJ 音标 (Phonetic Transcription)
[Complete sentence-level transcription using DJ phonemes, with stress marks]
```

### Output Rules

- Use Chinese labels for section headers (as shown above) since the target audience is Chinese learners
- In phonetic transcription, use **bold** or underline to mark sentence-stressed syllables
- Always use / / brackets for phonemic transcription
- Keep explanations concise and practical — explain WHY a feature occurs, not just WHAT it is
- If multiple connected speech features overlap in the same spot, note all of them
- For the phonetic transcription, produce both a **word-by-word** version (showing individual word boundaries) and a **connected speech** version (showing how it actually sounds linked together)
