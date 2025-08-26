"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./case.module.css";

export default function CasePage() {
  const [openA, setOpenA] = useState(false);

  const closeAll = () => {
    setOpenA(false);
  };

  // ESC로 닫기
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    if (openA) document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [openA]);

  // 모달 열릴 때 포커스 이동(간단 버전)
  const btnCloseA = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (openA) btnCloseA.current?.focus();
  }, [openA]);

  return (
    <main className={styles.page}>
      <h2 className={styles.title}>품 서비스 고객들의 이야기</h2>

      <div className={styles.actions}>
        <button className={styles.primary} onClick={() => setOpenA(true)}>
          <Image src="/image/몽.jpeg" alt="img" width={100} height={100} />
          <h2 className={styles.modalTitle}>몽이</h2>
        </button>
      </div>

      {openA && ( // 모달 열릴 때만 렌더링 (openA가 true일 때)
        <div className={styles.backdrop} onClick={closeAll} aria-hidden="true">
          <section
            className={styles.modal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modalA-title"
            onClick={(e) => e.stopPropagation()} // 내용 클릭 시 닫히지 않게
          >
            <header className={styles.modalHeader}>
              <h2 id="modalA-title">몽이</h2>
              <button
                ref={btnCloseA}
                className={styles.iconBtn}
                onClick={closeAll}
              >
                ✕
              </button>
            </header>

            <div className={styles.modalBody}>
              <p>종: 푸들</p>
              <p>성별: 수컷</p>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
