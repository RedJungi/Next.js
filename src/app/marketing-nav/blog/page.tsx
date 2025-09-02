import PaginationControls from "./components/PaginationControls";
import styles from "./blog.module.css";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

// Post 타입 정의
type Post = {
  id: number;
  title: string;
  content: string | null;
  author: string | null;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export default async function blogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>; // searchParams 타입 정의
}) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams["page"] ?? "1"); // 기본값 1
  const per_page = Number(resolvedSearchParams["per_page"] ?? "5"); // 기본값 15 (한 페이지에 보여줄 개수)

  // 페이지네이션을 위한 데이터 조회
  const posts = await prisma.post.findMany({ // Post 테이블에서 데이터 조회(Read)
    where: { published: true },
    orderBy: [
      { createdAt: "desc" }, // 최신순 우선 (블로그15 ~ 블로그1)
      { id: "desc" }, // 같은 시간이면 ID 높은 순
    ],
    skip: (page - 1) * per_page, // 페이지네이션 시작점
    take: per_page, // 한 페이지당 개수
  });

  // 전체 개수 조회 (페이지네이션용)
  const totalCount = await prisma.post.count({
    where: { published: true },
  });

  return (
    <div className={styles.container}>
      {posts.map((post: Post) => (
        <Link
          key={post.id}
          href={`/marketing-nav/blog/${post.id}`}
          className={styles.postCard}
        >
          <h2>{post.title}</h2>
          <p>{post.content?.substring(0, 100)}...</p> {/* 내용이 있을 때만 앞에서 100자까지 잘라서 표시하고 뒤에 ... 추가 */}
          <div className={styles.postMeta}>
            <span>작성자: {post.author || "익명"}</span> {/* 작성자가 없으면 "익명" 표시 */}
            <span>{new Date(post.createdAt).toLocaleDateString("ko-KR")}</span> {/* 한국 날짜 형식으로 표시 */}
          </div>
        </Link>
      ))}

      <PaginationControls totalPage={totalCount} />
    </div>
  );
}
