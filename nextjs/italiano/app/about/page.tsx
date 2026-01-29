import Link from "next/link";

export default function About() {
  return (
    <main className="main">
      <div>About italiano</div>
      <li><Link href="/">home</Link></li>
      <p className="text-blue-800  text-4xl grid grid-rows-1 gap-6 justify-items-center max-w-4xl mx-auto">This a site that is dedicated to the italian grammar</p>
    </main>
  );
}
