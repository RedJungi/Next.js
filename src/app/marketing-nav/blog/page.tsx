import PaginationControls from "./components/PaginationControls";
import styles from "./blog.module.css";

// 25개의 데이터
// (_, i) -> _ 첫번째 매개변수는 사용하지 않음
const data = Array.from({ length: 25 }, (_, i) => `blog ${i + 1}`); //인덱스가 1부터 시작

export default async function blogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedSearchParams = await searchParams;
  const page = resolvedSearchParams["page"] ?? "1"; // 기본값 1
  const per_page = resolvedSearchParams["per_page"] ?? "5"; // 기본값 5

  const start = (Number(page) - 1) * Number(per_page); // 0, 5, 10 ... 페이지네이션 시작 인덱스
  const end = start + Number(per_page); // 5, 10, 15 ... 페이지네이션 끝 인덱스

  const entries = data.slice(start, end); // 현재 페이지에 해당하는 항목들

  return (
    <div className={styles.container}>
      {entries.map(
        (
          entry,
          index // key는 index로 설정
        ) => (
          <p key={index}>{entry}</p>
        )
      )}

      <PaginationControls
        totalPage={data.length} // 전체 데이터 개수
      />
    </div>
  );
}
