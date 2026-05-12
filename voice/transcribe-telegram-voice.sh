#!/usr/bin/env bash
set -euo pipefail

if [[ $# -lt 1 ]]; then
  echo "Usage: $0 <audio-file> [language] [model_size]" >&2
  exit 1
fi

INPUT="$1"
LANGUAGE="${2:-ro}"
MODEL_SIZE="${3:-large-v3}"
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
VENV="/home/Liviu/.openclaw/venvs/voice-stt"
TMP_DIR="${SCRIPT_DIR}/.tmp"
mkdir -p "$TMP_DIR"

BASENAME="$(basename "$INPUT")"
WAV="${TMP_DIR}/${BASENAME}.wav"

ffmpeg -y -i "$INPUT" -ac 1 -ar 16000 -c:a pcm_s16le "$WAV" >/dev/null 2>&1
source "${VENV}/bin/activate"
python "${SCRIPT_DIR}/enhanced_transcribe.py" "$WAV" "$LANGUAGE" "$MODEL_SIZE"
