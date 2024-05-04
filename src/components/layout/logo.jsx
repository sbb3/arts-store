import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <span
        className="text-lg text-foreground cursor-pointer 
        font-sans font-bold tracking-tight leading-6 animate-pulse
      "
      >
        Art Store
      </span>
    </Link>
  );
}
