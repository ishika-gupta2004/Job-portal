import { Link } from "react-router-dom";

const highlights = ["Curated opportunities", "Clear job details", "Simple applications"];

export default function Home() {
  return <main>
    <section className="border-b border-slate-200 bg-linear-to-br from-brand-50 via-white to-slate-50"><div className="mx-auto max-w-7xl px-6 py-20 text-center sm:py-28">
      <p className="mb-4 text-sm font-semibold uppercase tracking-[0.18em] text-brand-700">Your next opportunity</p><h1 className="mx-auto max-w-3xl text-4xl font-bold tracking-tight text-slate-950 sm:text-6xl">Find work that moves your career forward.</h1>
      <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">Explore relevant roles from growing teams, with the information you need to make a confident decision.</p>
      <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row"><Link to="/jobs" className="rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-700">Browse open roles</Link><Link to="/register" className="rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-600 hover:text-brand-700">Create an account</Link></div>
    </div></section>
    <section className="mx-auto max-w-7xl px-6 py-16"><div className="max-w-2xl"><p className="text-sm font-semibold text-brand-700">Designed for focus</p><h2 className="mt-2 text-3xl font-bold tracking-tight">A straightforward way to discover jobs.</h2></div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">{highlights.map((item, index) => <article key={item} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-700">0{index + 1}</span><h3 className="mt-5 text-lg font-semibold">{item}</h3><p className="mt-2 text-sm leading-6 text-slate-600">Everything is presented in a clean, readable format so you can focus on the role and company.</p></article>)}</div>
    </section>
  </main>;
}
