"use client";

import { FC } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./PaginationControls.module.css";

// props 타입 정의
interface PaginationControlsProps {
  totalPage: number; 
}
// FC를 사용한 함수 컴포넌트 선언 제네릭으로 Props를 지정.
const PaginationControls: FC<PaginationControlsProps> = ({
  totalPage, 
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const page = searchParams.get("page") ?? "1"; // 기본값 1
  const per_page = searchParams.get("per_page") ?? "5"; // 기본값 5

  // 총 페이지 수 계산 ex) 25 / 5 = 5
  const currentPage = Number(page); // 현재 페이지 번호
  const totalPages = Math.ceil(totalPage / Number(per_page)); // 총 페이지 수
  const maxVisiblePages = 5; // 보여줄 최대 페이지 수

  //특정 페이지 번호를 클릭하면
  const handlePageClick = (pageNum: number) => { 
    router.push(`/marketing-nav/blog?page=${pageNum}&per_page=${per_page}`); // 페이지 변경 시 URL 업데이트
  };

  // 현재 페이지 그룹의 시작과 끝 계산
  const currentGroup = Math.ceil(currentPage / maxVisiblePages); // 현재 페이지 그룹 (1~5, 6~10)
  const startPage = (currentGroup - 1) * maxVisiblePages + 1; // 그룹의 시작 페이지
  const endPage = Math.min(startPage + maxVisiblePages - 1, totalPages); // 그룹의 끝 페이지

  return (
    <div className={styles.pagination}>
      {/* 이전 버튼 */}
      <button
        className={styles.button}
        disabled={currentPage === 1}
        onClick={() => {
          if (currentPage > maxVisiblePages) {
            // 이전 그룹의 마지막 페이지로
            handlePageClick(startPage - 1);
          } else {
            // 이전 페이지로
            handlePageClick(currentPage - 1);
          }
        }}
      >
        &lt; 이전
      </button>

      {/* 페이지 번호들 (1~5) */}
      {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(
        (pageNum) => (
          <button
            key={pageNum}
            className={`${styles.pageNumber} ${currentPage === pageNum ? styles.active : ''}`}
            onClick={() => handlePageClick(pageNum)}
          >
            {pageNum}
          </button>
        )
      )}

      {/* 다음 버튼 */}
      <button
        className={styles.button}
        disabled={currentPage === totalPages}
        onClick={() => {
          if (endPage < totalPages) {
            // 다음 그룹의 첫 페이지로
            handlePageClick(endPage + 1);
          } else {
            // 다음 페이지로
            handlePageClick(currentPage + 1);
          }
        }}
      >
        다음 &gt;
      </button>
    </div>
  );
};

export default PaginationControls;