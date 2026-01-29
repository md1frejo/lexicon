"use client";

import Image from "next/image";
import Navigation from "./components/navigation";
import PronounsTable from "./components/pronounstable";
import PosspronTable from "./components/possproTable";
import NounsTable from "./components/nouns";
import grammarData from "./data/gammar.json" 
import { useMemo, useState } from "react";
import Link from "next/link";

const verbs = grammarData.grammar
const order = ["io", "tu", "lui/lei", "noi", "voi", "loro"] as const;

// verbs contain all verbs from grammar.json

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

  // useState = 

  const [query, setQuery] = useState("");
  console.log(query)

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
  }, [query]);1

  return (

    <main className="main min-h-screen">
      <header>
        <Navigation />
      </header>
      
      <section className="flex justify-center mb-6">
        <figure>
          <Image src="https://www.adriabandiere.com/wp-content/uploads/2021/05/michele-bitetto-jf5SQVEKSFw-unsplash-1482x635.jpg" alt="italiano" width={750} height={422} priority/>
        </figure>
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

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-5">
          {verbs.map((v) => ( <div key={v.verb} className="rounded-2xl shadow-md border p-5 bg-white">
              <h3 className="text-xl font-semibold mb-4">{v.verb}</h3>
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
      </section> 
    </main>
  );
}


