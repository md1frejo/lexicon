"use client";

import { useState } from "react";
import posspronData from "../data/possesivePron.json";

export default function posspronTable() {
  const [open, setOpen] = useState(false);

  return (
    
    <section className="max-w-4xl mx-auto px-6 mb-8">
      <button
        onClick={() => setOpen((x) => !x)}
        className="px-4 py-2 rounded-xl border shadow-sm bg-white hover:bg-gray-50"
      >
        {open ? "Hide possesive ▲" : "Show possesive ▼"}
      </button>

      {open && (
        <div className="mt-4 rounded-2xl shadow-md border p-5 bg-white">
          <h3 className="text-xl font-semibold mb-4">
            {posspronData.title}
          </h3>

          <table className="w-full border-collapse">
            <thead>
              <tr className="text-left border-b">
                <th className="py-2">Pronoun</th>
                <th className="py-2">Meaning</th>
              </tr>
            </thead>

            <tbody>
              {posspronData.possesive.map((p) => (
                <tr key={p["masc sing"]} className="border-b last:border-b-0">
                  <td className="py-2 font-medium">{p["masc pl"]}</td>
                  <td className="py-2">{p["fem sing"]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}
