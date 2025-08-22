import { ReactNode } from "react";
import Link from "next/link";
import styles from "./header.module.css";
import Image from "next/image";

const links = [
  { href: "/marketing-nav/introduction", label: "회사 소개" },
  { href: "/marketing-nav/service", label: "서비스 소개" },
  { href: "/marketing-nav/blog", label: "블로그" },
  { href: "/marketing-nav/case", label: "고객 사례" },
  { href: "/marketing-nav/demoform", label: "데모 신청" },
];

export default function Header({ header }: { header: ReactNode }) {
  return (
    <div className={styles.header}>
      <Link href="/" className={styles.logo}>
        <Image
          src="/image/Logo.png"
          alt="Phum Logo"
          width={40}
          height={30}
          priority
        />
        Phum{header}
      </Link>
      <nav className={styles.nav}>
        {links.map((link) => (
          <Link key={link.href} href={link.href} className={styles.link}>
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}
