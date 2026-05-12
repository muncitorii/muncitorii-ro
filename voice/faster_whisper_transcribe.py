#!/usr/bin/env python3
import json
import sys
from pathlib import Path
from faster_whisper import WhisperModel

if len(sys.argv) < 2:
    print("Usage: faster_whisper_transcribe.py <audio-file> [language] [model_size]", file=sys.stderr)
    sys.exit(1)

audio_path = sys.argv[1]
language = sys.argv[2] if len(sys.argv) > 2 else "ro"
model_size = sys.argv[3] if len(sys.argv) > 3 else "small"

model = WhisperModel(model_size, device="cpu", compute_type="int8")
segments, info = model.transcribe(audio_path, language=language, vad_filter=True, beam_size=5)
items = []
full_text = []
for seg in segments:
    text = seg.text.strip()
    if not text:
        continue
    items.append({
        "start": seg.start,
        "end": seg.end,
        "text": text,
    })
    full_text.append(text)

print(json.dumps({
    "ok": True,
    "language": language,
    "detected_language": getattr(info, "language", None),
    "duration": getattr(info, "duration", None),
    "model": model_size,
    "text": " ".join(full_text).strip(),
    "segments": items,
}, ensure_ascii=False))
