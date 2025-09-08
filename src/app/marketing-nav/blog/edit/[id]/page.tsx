import { redirect } from "next/navigation";
import styles from "./writeBlog.module.css";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

async function updatePost(blogForm: FormData) {
  "use server";

  const title = blogForm.get("title")?.toString();
  const content = blogForm.get("content")?.toString();
  const author = blogForm.get("author")?.toString();

  if (!title || !content || !author) {
    redirect("/marketing-nav/blog/write?validation=true");
    return;
  }

  try {
    await prisma.post.update({
      where: {
        id: parseInt(blogForm.get("postId")?.toString() || ""), // postId는 string이므로 숫자로 변환
      },
      data: {
        title,
        content,
        author,
      },
    });
  } catch (error) {
    console.error("Database error:", error);
    redirect("/marketing-nav/blog/write?error=true");
  }
  //성공시
  redirect("/marketing-nav/blog?success=true");
}

export default async function updatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 기존 게시글 데이터 조회
  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
  });

  if (!post) {
    // 게시글이 없으면 블로그 목록으로 리다이렉트
    redirect("/marketing-nav/blog");
  }

  return (
    <div className={styles.writeForm}>
      <form className={styles.inputForm} action={updatePost}>
        <div className={styles.titleInput}>
          <input type="hidden" name="postId" value={post.id} />
          <Input
            name="title"
            placeholder="제목"
            defaultValue={post.title}
            required
          />
        </div>
        <div className={styles.contentInput}>
          <Textarea
            name="content"
            placeholder="내용"
            defaultValue={post.content || ""}
            required
          />
        </div>
        <div className={styles.authorInput}>
          <Input
            name="author"
            placeholder="작성자"
            defaultValue={post.author || ""}
          />
        </div>

        <div className={styles.buttonContainer}>
          <Link href="/marketing-nav/blog">
            <Button type="button" className={styles.button}>
              취소하기
            </Button>
          </Link>
          <Button type="submit" className={styles.button}>
            수정하기
          </Button>
        </div>
      </form>
    </div>
  );
}
