"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import styles from "./case.module.css";

export default function CasePage() {
  const [open, setOpen] = useState(false);

  const closeAll = () => {
    setOpen(false);
  };

  // ESC로 닫기
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAll();
    };
    if (open) document.addEventListener("keydown", onKeyDown); // 모달창이 열려 있을 때만 키보드 이벤트 리스너 등록
    return () => document.removeEventListener("keydown", onKeyDown); // 컴포넌트 언마운트 시 리스너 해제(이벤트 리스너 누적시 중복 실행 방지)
  }, [open]); // open이 변경될 때마다 실행

  // 모달 열릴 때 포커스 이동
  const btnClose = useRef<HTMLButtonElement | null>(null); 

  useEffect(() => {
    if (open) btnClose.current?.focus();  // 모달이 열릴 때 닫기 버튼에 포커스 이동
  }, [open]);

  return (
    <main className={styles.page}>
      <h2 className={styles.title}>품 서비스 고객들의 이야기</h2>

      <div className={styles.actions}>
        <button className={styles.primary} onClick={() => setOpen(true)}>
          <Image src="/image/몽.jpeg" alt="img" width={100} height={100} />
          <h2 className={styles.modalTitle}>몽이</h2>
        </button>
      </div>

      {open && ( // 모달 열릴 때만 렌더링 (open이 true일 때)
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
                ref={btnClose}
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
