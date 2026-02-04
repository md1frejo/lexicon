"use client";

import Image from "next/image";
import Navigation from "./components/navigation";
import PronounsTable from "./components/pronounstable";
import PosspronTable from "./components/possproTable";
import NounsTable from "./components/nouns";
import grammarData from "./data/gammar.json" 
import { useMemo, useState } from "react";
import Link from "next/link";
import { NextResponse } from "next/server";
import { error } from "console";
import * as cheerio from "cheerio";


const verbs = grammarData.grammar
const order = ["io", "tu", "lui/lei", "noi", "voi", "loro"] as const;

// verbs contain all verbs from grammar.json

type Person = "io" | "tu" | "lui/lei" | "noi" | "voi" | "loro";

export type VerbConjugationJSON = {
  verb: string;
  sourceUrl: string;
  conjugation: Record<string, Record<string, Partial<Record<Person, string>>>>;
};

function Highlight({text,query,}: {

  text: string;
  query: string; }) {

    const q = query.trim();

    if (!q) return <>{text}</>;

      const idx = text.toLowerCase().indexOf(q.toLowerCase());

      if (idx === -1) return <>{text}</>;

        const before = text.slice(0, idx);
        const match = text.slice(idx, idx + q.length);
        const after = text.slice(idx + q.length);

  return (
    <>
      {before}
      <mark className="px-1 rounded bg-blue-300">{match}</mark>
      {after}
    </>
  );
}

export default function Home() {

  // useState = saves a state 
  // query gets the search term and state updates
  const [query, setQuery] = useState("");
  console.log(query)

  const [selectedVerb, setSelectedVerb] = useState<string | null>(null);
  const [conj, setConj] = useState<VerbConjugationJSON | null>(null);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null)

  // usememo converts to lowercase and filters the verblist
  // forms is all the conjugations
  const filtered = useMemo(() => {
  const q = query.trim().toLowerCase();
    if (!q) return verbs;

     return verbs.filter((v) => {
      const verbMatch = v.verb.toLowerCase().includes(q);
      const formsMatch = Object.values(v.forms).some((form) =>
        form.toLowerCase().includes(q)
      );
      return verbMatch || formsMatch;
    });
  }, [query]);

  async function handleVerbClick(verb: string) {

    setSelectedVerb(verb);
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch(
        `/api/scrapeverbs?verb=${encodeURIComponent(verb)}`
      );

      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }

      const data: VerbConjugationJSON = await res.json();
      setConj(data);

      // watch it in console
      console.log("SCRAPED CONJUGATION JSON:", data);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err?.message ?? "Unknown error");
      setConj(null);
    } finally {
      setLoading(false);
    }
  }

  const indicativoPresente = conj?.conjugation?.indicativo?.presente ?? null;

    // scrapeverbs1("andare");

  return (

    <main className="main min-h-screen">
      <header>
        <Navigation />

      </header>
      

<section className="mb-6">
  <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6 items-start">
    {/* LEFT: verb list */}
    <aside className="bg-white border rounded-2xl shadow-sm p-4">
      <h2 className="text-lg font-semibold mb-3">Verbs</h2>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search verb..."
        className="w-full p-2 border rounded-xl mb-3 outline-none"
      />

      <div className="max-h-[360px] overflow-auto">
        <ul className="space-y-1">
          {filtered.map((v) => {
            const active = selectedVerb === v.verb;

            return (
              <li key={v.verb}>
                <button
                  onClick={() => handleVerbClick(v.verb)}
                  className={[
                    "w-full text-left px-3 py-2 rounded-xl transition",
                    active
                      ? "bg-blue-600 text-white font-semibold"
                      : "hover:bg-gray-100",
                  ].join(" ")}
                >
                  {v.verb}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>

    <figure className="flex justify-center">
      <Image
        src="https://www.adriabandiere.com/wp-content/uploads/2021/05/michele-bitetto-jf5SQVEKSFw-unsplash-1482x635.jpg"
        alt="italiano"
        width={750}
        height={422}
        priority
        className="rounded-2xl"
      />
    </figure>
  </div>
</section>

      <div className="flex justify-center">
        <input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search verbs (es: essere, ho, siamo...)"
          className="bg-amber-50 p-3 rounded-xl border shadow-sm outline-none max-w-xl w-full mb-6"/>
        <p className="text-sm text-gray-600 mt-2 m-6">
          Showing <strong>{filtered.length}</strong> / {verbs.length}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center max-w-4xl mx-auto">
        <PronounsTable />
        <NounsTable />
        <PosspronTable />
      </div>
z
      <section className="p-6 max-w-4xl mx-auto">

        <h2 className="text-2xl font-bold mb-6">Italian verbs</h2>

                {/* RESULTS */}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {filtered.map((v) => (
            <div
              key={v.verb}
              className="rounded-2xl shadow-md border p-5 bg-white">
              <h3
                className="text-xl font-semibold mb-4 cursor-pointer underline underline-offset-4"
                onClick={() => handleVerbClick(v.verb)} title="Click to scrape conjugation">
                {v.verb}
              </h3>

              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-2">Person</th>
                    <th className="py-2">Form</th>
                  </tr>
                </thead>

                <tbody>
                  {order.map((person) => (
                    <tr key={person} className="border-b last:border-b-0">
                      <td className="py-2 font-medium">{person}</td>
                      <td className="py-2">
                        <Highlight text={v.forms[person]} query={query} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>

        <div className="mt-10">
          {loading && (
            <p className="text-lg font-medium">
              Scraping conjugation for <strong>{selectedVerb}</strong>...
            </p>
          )}

          {errorMsg && (
            <p className="text-red-600">
              Error: {errorMsg}
            </p>
          )}

          {!loading && conj && (
            <div className="mt-4 rounded-2xl border shadow-md p-6 bg-white">
              <h2 className="text-2xl font-bold mb-2">
                Conjugation: {conj.verb}
              </h2>

              <p className="text-sm text-gray-600 mb-4">
                Source:{" "}
                <a
                  className="underline"
                  href={conj.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {conj.sourceUrl}
                </a>
              </p>

              {/* Example: Indicativo Presente */}
              <h3 className="text-xl font-semibold mb-3">
                Indicativo — Presente
              </h3>

              {indicativoPresente ? (
                <ul className="space-y-1">
                  {order.map((p) => (
                    <li key={p}>
                      <strong>{p}:</strong>{" "}
                      {indicativoPresente[p] ?? "-"}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">
                  No indicativo/presente found in scraped JSON yet.
                </p>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

// rest api går via url
// represential state transfer
// graaphql, specar vad som ska hämtas
// kolla fetch i network tabben

//export async function scrapeverbs1(verb: string): Promise<VerbConjugationJSON> {
//
//  const baseurl="https://www.italian-verbs.com/los-verbos-italianos/conjugacion.php"
//  const url= new URL(baseurl);
//  url.searchParams.set("parola",verb);

//  const res = await fetch(url.toString(), {
//    headers: {
//      "User-Agent": 
//        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
//    },
//    cache: "no-store",
//  })

//  const html = await res.text();

//  return {
//    verb,
//    sourceUrl: url.toString(),
//    conjugation: {}, // fill this later with cheerio parsing
//  };
//}

// const res = await fetch(`/api/scrapeverbs?verb=andare`);
//console.log(scrapeverbs1("andare"))

//export function Scrapev() {
//  async function handleScrape() {
//    const res = await fetch(`/api/scrapeverbs?verb=andare`);
//    const data = await res.json();
//    console.log(data);
//  }

//  return (
//    <div>
//      <button onClick={handleScrape}>Scrape andare</button>
//    </div>
//  );
//}
