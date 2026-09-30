"use client";

import { useRef, useState } from "react";
import { Mic, MicOff } from "lucide-react";

type SpeechRecognitionResultLike = {
  results: { [index: number]: { [index: number]: { transcript: string } } } & { length: number };
};

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  start: () => void;
  stop: () => void;
  onresult: ((event: SpeechRecognitionResultLike) => void) | null;
  onend: (() => void) | null;
  onerror: (() => void) | null;
};

/**
 * Buton de dictare voce pentru descrierea lucrării — folosește Web Speech
 * API nativ din browser (webkitSpeechRecognition), fără nicio dependență
 * nouă. Disponibil doar în Chrome/Edge desktop și Chrome Android; pe
 * browsere fără suport butonul nu se afișează (fallback: scrii direct în
 * textarea).
 */
export function VoiceDictationButton({ onResult }: { onResult: (text: string) => void }) {
  const [listening, setListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);

  if (typeof window === "undefined") return null;

  const SpeechRecognitionCtor =
    (window as unknown as { webkitSpeechRecognition?: new () => SpeechRecognitionLike }).webkitSpeechRecognition ??
    (window as unknown as { SpeechRecognition?: new () => SpeechRecognitionLike }).SpeechRecognition;

  if (!SpeechRecognitionCtor) return null;

  function toggle() {
    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    if (!SpeechRecognitionCtor) return;
    const recognition = new SpeechRecognitionCtor();
    recognition.lang = "ro-RO";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const last = event.results[event.results.length - 1];
      const transcript = last?.[0]?.transcript ?? "";
      if (transcript) onResult(transcript);
    };
    recognition.onend = () => setListening(false);
    recognition.onerror = () => setListening(false);

    recognitionRef.current = recognition;
    recognition.start();
    setListening(true);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
        listening
          ? "border-rose-300 bg-rose-50 text-rose-700"
          : "border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
      }`}
    >
      {listening ? <MicOff size={13} /> : <Mic size={13} />}
      {listening ? "Ascult... apasă să opreşti" : "Dictează"}
    </button>
  );
}
