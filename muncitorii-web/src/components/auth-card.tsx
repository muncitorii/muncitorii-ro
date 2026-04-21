type AuthCardProps = {
  title: string;
  subtitle: string;
  role: "client" | "muncitor";
};

export function AuthCard({ title, subtitle, role }: AuthCardProps) {
  const isWorker = role === "muncitor";

  return (
    <div className="w-full max-w-md rounded-[2rem] border border-slate-200 bg-white p-6 shadow-sm md:p-8">
      <div>
        <span className="inline-flex rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700">
          {isWorker ? "Cont muncitor" : "Cont client"}
        </span>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-950">{title}</h1>
        <p className="mt-2 text-sm leading-6 text-slate-600">{subtitle}</p>
      </div>

      <form className="mt-6 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Nume complet</label>
          <input
            type="text"
            placeholder="Ex: Ion Popescu"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            placeholder="tu@email.com"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-slate-700">Parolă</label>
          <input
            type="password"
            placeholder="Introdu parola"
            className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500"
          />
        </div>

        {isWorker ? (
          <>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Meserie principală</label>
              <input
                type="text"
                placeholder="Ex: Electrician"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium text-slate-700">Oraș / Județ</label>
              <input
                type="text"
                placeholder="Ex: București"
                className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm outline-none placeholder:text-slate-400 focus:border-blue-500"
              />
            </div>
          </>
        ) : null}

        <button className="w-full rounded-2xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
          Creează cont
        </button>
      </form>

      <div className="mt-5 text-center text-sm text-slate-600">
        <a href="/login" className="font-semibold text-blue-700 hover:text-blue-800">
          Ai deja cont? Intră aici
        </a>
      </div>
    </div>
  );
}
