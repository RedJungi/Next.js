import { ReactNode } from "react";
import Link from "next/link";
import styles from "./header.module.css";
import Image from "next/image";

import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const links = [
  { href: "/marketing-nav/introduction", label: "회사 소개" },
  { href: "/marketing-nav/service", label: "서비스 소개" },
  { href: "/marketing-nav/blog", label: "블로그" },
  { href: "/marketing-nav/case", label: "고객 사례" },
  { href: "/marketing-nav/demoform", label: "데모 신청" },
  { href: "/marketing-nav/tealounge", label: "Tea Lounge" },
];

const menuItemClass =
  "block w-full rounded-md px-3 py-2 text-sm leading-none " +
  "transition-colors duration-200 " +
  "hover:bg-accent hover:text-accent-foreground " +
  "focus:outline-none focus:bg-accent focus:text-accent-foreground";

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
        {header}
        Phum
      </Link>

      <nav className={styles.nav}>
        <NavigationMenu>
          <NavigationMenuList>
            {links.map((link) =>
              link.label === "서비스 소개" ? (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuTrigger>
                    <Link href={link.href}>{link.label}</Link>
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="p-4 w-[200px] space-y-2 ">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/marketing-nav/service/backup-service"
                          className={menuItemClass}>
                            품 백업 서비스
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/marketing-nav/service/dr-service"
                          className={menuItemClass}>
                            품 DR 서비스
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/marketing-nav/service/virtualization"
                          className={menuItemClass}>
                            품 가상화 서비스
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/marketing-nav/service/spanning-m365"
                          className={menuItemClass}>
                            품 스패닝 M365
                          </Link>
                        </NavigationMenuLink>
                      </li>
                      <li>
                        <NavigationMenuLink asChild>
                          <Link
                            href="/marketing-nav/service/unitrends"
                           className={menuItemClass}>
                            품 유니트렌드
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={link.href}>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href={link.href}>{link.label}</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </nav>
    </div>
  );
}
