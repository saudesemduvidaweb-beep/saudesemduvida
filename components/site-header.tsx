import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { mainNav, siteConfig } from "@/lib/site-config";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" aria-label={siteConfig.name}>
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {mainNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-foreground/80 transition-colors hover:text-foreground"
            >
              {item.title}
            </Link>
          ))}
        </nav>

        <Button asChild size="sm">
          <Link href={siteConfig.ctaHref}>{siteConfig.ctaLabel}</Link>
        </Button>
      </div>
    </header>
  );
}
