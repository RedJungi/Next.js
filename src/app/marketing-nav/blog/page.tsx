import PaginationControls from "./components/PaginationControls";
import styles from "./blog.module.css";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";

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
// 수정 Server Action 함수
export async function updatePost(formData: FormData) {
  "use server";

  const postId = formData.get("postId")?.toString();
  const title = formData.get("title")?.toString();
  const content = formData.get("content")?.toString();

  if (!postId || !title || !content) {
    return;
  }

  try {
    await prisma.post.update({
      where: {
        id: parseInt(postId), // postId는 string이므로 숫자로 변환
      },
      data: {
        title,
        content,
      },
    });
  } catch (error) {
    console.error("Update error:", error);
    // 에러 처리
    redirect("/marketing-nav/blog?error=true");
  }
  redirect("/marketing-nav/blog"); // 또는 해당 페이지
}

// 삭제 Server Action 함수
async function deletePost(formData: FormData) {
  "use server";

  const postId = formData.get("postId")?.toString();

  if (!postId) {
    return;
  }
  try {
    await prisma.post.deleteMany({
      where: {
        id: parseInt(postId),
      },
    });
  } catch (error) {
    console.error("Delete error:", error);
    // 에러 처리
    redirect("/marketing-nav/blog?error=true");
  }
  // 삭제 후 페이지 새로고침 또는 리다이렉트
  redirect("/marketing-nav/blog"); // 또는 해당 페이지
}
// 블로그 메인 페이지 컴포넌트
export default async function blogPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>; // searchParams 타입 정의
}) {
  const resolvedSearchParams = await searchParams;
  const page = Number(resolvedSearchParams["page"] ?? "1"); // 기본값 1
  const per_page = Number(resolvedSearchParams["per_page"] ?? "5"); // 기본값 15 (한 페이지에 보여줄 개수)

  // 페이지네이션을 위한 데이터 조회
  const posts = await prisma.post.findMany({
    // Post 테이블에서 데이터 조회(Read)
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
        <div key={post.id} className={styles.postCard}>
          <Link href={`/marketing-nav/blog/${post.id}`}>
            <h2>{post.title}</h2>
            <p>{post.content?.substring(0, 100)}...</p>
          </Link>

          <div className="flex gap-2 mb-2">
            <form action={deletePost}>
              <input type="hidden" name="postId" value={post.id} />
              <Button type="submit">삭제</Button>
            </form>

            <Link href={`/marketing-nav/blog/edit/${post.id}`}>
              <form action={updatePost}>
                <input type="hidden" name="postId" value={post.id} />
                <Button type="submit">수정</Button>
              </form>
            </Link>
          </div>

          <div className={styles.postMeta}>
            <span>작성자: {post.author || "익명"}</span>
            <span>{new Date(post.createdAt).toLocaleDateString("ko-KR")}</span>
          </div>
        </div>
      ))}
      <PaginationControls totalPage={totalCount} />

      <Link href="/marketing-nav/blog/write">
        <button className={styles.writeButton}>글쓰기</button>
      </Link>
    </div>
  );
}
