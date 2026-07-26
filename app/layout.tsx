import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "BIMpact.io",
  description: "Context Information Model and Intent Management System"
};

const navItems = [
  ["/", "Home"],
  ["/how-it-works", "How It Works"],
  ["/use-cases", "Use Cases"],
  ["/domains", "Domains"],
  ["/contact", "Contact"],
  ["/app", "App (SaaS shell)"]
];

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="nav">
          <nav className="container nav-inner" aria-label="Main navigation">
            <span className="brand">BIMpact.io</span>
            {navItems.map(([href, label]) => (
              <Link key={href} href={href}>
                {label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="container">{children}</main>
        <footer className="container footer-nav" aria-label="Footer navigation">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
          <Link href="/contact">Contact</Link>
        </footer>
      </body>
    </html>
  );
}
