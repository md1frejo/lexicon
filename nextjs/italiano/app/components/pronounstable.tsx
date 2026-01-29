"use client";

// runs in browser

import { useState } from "react";
import pronounsData from "../data/pronouns.json";

export default function PronounsTable() {
  const [open, setOpen] = useState(false);
  // open starts at false

  return (
    
    <section className="max-w-4xl mx-auto px-6 mb-8">
      <button
        onClick={() => setOpen((x) => !x)} // sets it to opposite, opening
        className="px-4 py-2 rounded-xl border shadow-sm bg-white hover:bg-gray-50">
        {open ? "Hide pronouns ▲" : "Show pronouns ▼"} 
      </button>

      {open && (
        <div className="mt-4 rounded-2xl shadow-md border p-5 bg-white">
          <h3 className="text-xl font-semibold mb-4">
            {pronounsData.title}
          </h3>

          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Pronoun</th>
                <th className="py-2">Meaning</th>
              </tr>
            </thead>
            <tbody>
              {pronounsData.pronouns.map((p) => (
                <tr key={p.person} className="border-b last:border-b-0">
                  <td className="py-2 font-medium">{p.person}</td>
                  <td className="py-2">{p.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
