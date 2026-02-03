import { load } from "cheerio";

type Person = "io" | "tu" | "lui/lei" | "noi" | "voi" | "loro";

export type VerbConjugationJSON = {
  verb: string;
  sourceUrl: string;
  conjugation: {
    indicativo: Record<string, Partial<Record<Person, string>>>;
  };
};

function clean(s: string) {
  return s.replace(/\s+/g, " ").trim();
}

function normalizePerson(raw: string): Person | null {
  const x = clean(raw).toLowerCase();

  if (x === "io") return "io";
  if (x === "tu") return "tu";
  if (x === "noi") return "noi";
  if (x === "voi") return "voi";
  if (x === "loro") return "loro";
  if (x === "lui/lei" || x === "lui" || x === "lei") return "lui/lei";

  return null;
}

// "io vado" => { person: "io", form: "vado" }
function parseLine(line: string): { person: Person; form: string } | null {
  const text = clean(line);

  // expected: "io vado", "lui/lei va"
  const firstSpace = text.indexOf(" ");
  if (firstSpace === -1) return null;

  const left = text.slice(0, firstSpace).toLowerCase();
  const right = text.slice(firstSpace + 1);

  // special case "lui/lei" contains slash, but still no spaces, OK
  const person = normalizePerson(left);
  if (!person) return null;

  return { person, form: clean(right) };
}

export async function scrapeverbs1(verb: string): Promise<VerbConjugationJSON> {
  const baseurl =
    "https://www.italian-verbs.com/los-verbos-italianos/conjugacion.php";

  const url = new URL(baseurl);
  url.searchParams.set("parola", verb);

  const res = await fetch(url.toString(), {
    headers: {
      "User-Agent": "Mozilla/5.0",
      Accept: "text/html",
    },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error(`Fetch failed: ${res.status} ${res.statusText}`);
  }

  const html = await res.text();
  const $ = load(html);

  // output JSON
  const indicativo: Record<string, Partial<Record<Person, string>>> = {};

  /**
   * On this site:
   * <span class="tempo">PRESENTE</span>
   * then several <div class="... cpad">io vado</div>
   */
  $("span.tempo").each((_, tempoEl) => {
    const tense = clean($(tempoEl).text()).toLowerCase(); // presente, imperfetto, etc.
    if (!tense) return;

    // create tense bucket
    if (!indicativo[tense]) indicativo[tense] = {};

    // move forward in DOM and collect following conjugation lines
    // until we hit another tempo or we stop seeing cpad rows
    let node = $(tempoEl).parent().next();

    // sometimes span.tempo is inside another div, so try both:
    if (node.length === 0) node = $(tempoEl).next();

    while (node.length > 0) {
      // stop if we hit another tense title
      if (node.find("span.tempo").length > 0 || node.is("span.tempo")) break;

      // conjugation rows are divs with class "cpad"
      if (node.is("div") && node.hasClass("cpad")) {
        const parsed = parseLine(node.text());
        if (parsed) {
          indicativo[tense][parsed.person] = parsed.form;
        }
      }

      node = node.next();
    }
  });

  return {
    verb,
    sourceUrl: url.toString(),
    conjugation: {
      indicativo,
    },
  };
}

