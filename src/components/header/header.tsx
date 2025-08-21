import { ReactNode } from "react";
import Link from "next/link";

const links = [
  { href: "/introduction", label: "회사 소개" },
  { href: "/service", label: "서비스 소개" },
  { href: "/blig", label: "블로그" },
  { href: "/case", label: "고객 사례" },
];

export default function Header({ header }: { header: ReactNode }) {
  return <div>Header{header}</div>;
}
