import { ReactNode } from "react";
import styles from "./footer.module.css";
import Image from "next/image";

export default function Footer({ footer }: { footer: ReactNode }) {
  return (
    <footer className={styles.footer}>
      {footer}
      
      <div>
        <Image
                  src="/image/Logo.png"
                  alt="Phum Logo"
                  width={20}
                  height={20}
                  priority
                />
        Phum</div>
    </footer>
  );
}
