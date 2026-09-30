"use client";

import { useActionState, useRef, useState } from "react";
import imageCompression from "browser-image-compression";
import { ImagePlus, X, Loader2 } from "lucide-react";
import { jobTypes } from "@/lib/job-types";
import { submitIntakeAction, type IntakeActionState } from "@/app/(public)/cerere/actions";
import { VoiceDictationButton } from "@/components/voice-dictation-button";

const MAX_PHOTOS = 8;

export function IntakeForm() {
  const [state, formAction, isPending] = useActionState<IntakeActionState, FormData>(
    submitIntakeAction,
    null,
  );
  const [photos, setPhotos] = useState<File[]>([]);
  const [compressing, setCompressing] = useState(false);
  const [description, setDescription] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(fileList: FileList | null) {
    if (!fileList) return;
    setCompressing(true);
    try {
      const incoming = Array.from(fileList).slice(0, MAX_PHOTOS - photos.length);
      const compressed = await Promise.all(
        incoming.map((file) =>
          imageCompression(file, { maxSizeMB: 0.4, maxWidthOrHeight: 1600, useWebWorker: true }).catch(
            () => file,
          ),
        ),
      );
      setPhotos((prev) => [...prev, ...compressed].slice(0, MAX_PHOTOS));
    } finally {
      setCompressing(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  function removePhoto(index: number) {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  }

  return (
    <form
      action={(formData) => {
        photos.forEach((photo) => formData.append("photos", photo, photo.name));
        return formAction(formData);
      }}
      className="mt-6 space-y-5"
    >
      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Tip lucrare *</label>
        <select
          name="work_type"
          required
          defaultValue=""
          className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm outline-none focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
        >
          <option value="" disabled>
            Alege tipul lucrării...
          </option>
          {jobTypes.map(({ slug, label }) => (
            <option key={slug} value={slug}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <div className="mb-1.5 flex items-center justify-between gap-3">
          <label className="block text-sm font-medium text-slate-700">Descriere *</label>
          <VoiceDictationButton
            onResult={(text) => setDescription((prev) => (prev ? `${prev} ${text}` : text))}
          />
        </div>
        <textarea
          name="description"
          rows={5}
          required
          minLength={10}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Descrie ce ai de făcut: suprafață, stare actuală, ce vrei să obții..."
          className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Poze <span className="text-slate-400">(până la {MAX_PHOTOS}, opțional dar recomandat)</span>
        </label>
        <div className="flex flex-wrap gap-2">
          {photos.map((photo, i) => (
            <div key={`${photo.name}-${i}`} className="relative h-16 w-16 overflow-hidden rounded-xl border border-slate-200">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={URL.createObjectURL(photo)} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => removePhoto(i)}
                className="absolute right-0.5 top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-slate-950/70 text-white"
                aria-label="Șterge poza"
              >
                <X size={11} />
              </button>
            </div>
          ))}
          {photos.length < MAX_PHOTOS && (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={compressing}
              className="flex h-16 w-16 items-center justify-center rounded-xl border border-dashed border-slate-300 text-slate-400 transition hover:border-primary-500 hover:text-primary-700 disabled:opacity-50"
            >
              {compressing ? <Loader2 size={18} className="animate-spin" /> : <ImagePlus size={18} />}
            </button>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">Oraș *</label>
        <input
          name="city"
          type="text"
          required
          placeholder="Ex: Brașov"
          className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Buget orientativ <span className="text-slate-400">(opțional)</span>
          </label>
          <input
            name="budget_hint"
            type="text"
            placeholder="Ex: 8.000-12.000 lei"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">
            Termen dorit <span className="text-slate-400">(opțional)</span>
          </label>
          <input
            name="deadline_hint"
            type="text"
            placeholder="Ex: în 3 săptămâni"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Nume *</label>
          <input
            name="name"
            type="text"
            required
            placeholder="Numele tău"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Telefon *</label>
          <input
            name="phone"
            type="tel"
            required
            placeholder="07xx xxx xxx"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-primary-700 focus:ring-2 focus:ring-primary-700/15"
          />
        </div>
      </div>

      {state && !state.ok && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{state.error}</p>
      )}

      <button
        type="submit"
        disabled={isPending || compressing}
        className="w-full rounded-2xl bg-primary-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-700 disabled:opacity-60"
      >
        {isPending ? "Se trimite..." : "Trimite cererea"}
      </button>
    </form>
  );
}
