import Link from "next/link";

const menu = [
  { title: "home", href: "/" },
  { title: "About grammar", href: "/about" },
  { title: "contact us", href: "/contact" },
];


// navigation links
export default function Navigation() {
  return (
    <nav className="flex justify-center items-center gap-6 w-full">
      <ul>
        <li><Link href="/about">about</Link></li>
      </ul>
    </nav>
  );
}



     // menu.map((item) => (
     //     <li key={item.href}>
     //       <Link href={item.href}>{item.title}</Link>
     //     </li>
     //   ))}
   