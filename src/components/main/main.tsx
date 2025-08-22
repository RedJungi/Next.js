import { ReactNode } from "react";
import styles from "./main.module.css";

export default function Main({ main }: { main: ReactNode }) {
  return <div className={styles.main}>{main}</div>;
}
