#!/usr/bin/env python3
import json
import sys
import tempfile
from pathlib import Path

import noisereduce as nr
import soundfile as sf
from faster_whisper import WhisperModel


def preprocess(inp: str) -> str:
    data, sr = sf.read(inp)
    reduced = nr.reduce_noise(y=data, sr=sr, stationary=False, prop_decrease=0.85)
    tmp = tempfile.NamedTemporaryFile(suffix='.wav', delete=False)
    sf.write(tmp.name, reduced, sr)
    return tmp.name


def main():
    if len(sys.argv) < 2:
        print('Usage: enhanced_transcribe.py <audio-file> [language] [model]', file=sys.stderr)
        sys.exit(1)
    audio_path = sys.argv[1]
    language = sys.argv[2] if len(sys.argv) > 2 else 'ro'
    model_size = sys.argv[3] if len(sys.argv) > 3 else 'large-v3'
    prepared = preprocess(audio_path)
    model = WhisperModel(model_size, device='cpu', compute_type='int8')
    segments, info = model.transcribe(
        prepared,
        language=language,
        vad_filter=True,
        beam_size=8,
        best_of=5,
        temperature=0,
        condition_on_previous_text=True,
        word_timestamps=False,
    )
    out = []
    text = []
    for seg in segments:
        t = seg.text.strip()
        if not t:
            continue
        out.append({'start': seg.start, 'end': seg.end, 'text': t})
        text.append(t)
    print(json.dumps({
        'ok': True,
        'language': language,
        'detected_language': getattr(info, 'language', None),
        'duration': getattr(info, 'duration', None),
        'model': model_size,
        'text': ' '.join(text).strip(),
        'segments': out,
    }, ensure_ascii=False))


if __name__ == '__main__':
    main()
