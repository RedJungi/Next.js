import { redirect } from "next/navigation";
import styles from "./writeBlog.module.css";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

async function writeBlog(blogForm: FormData) {
  "use server";

  const title = blogForm.get("title")?.toString();
  const content = blogForm.get("content")?.toString();
  const author = blogForm.get("author")?.toString();

  if (!title || !content || !author) {
    redirect("/marketing-nav/blog/write?validation=true");
    return;
  }

  try {
    //트랜잭션으로 두 테이블에 동시에 저장
    //둘중 하나라도 에러가 나면 취소(에러)
    await prisma.$transaction([
      prisma.post.create({ data: { title, content, author } }),
      prisma.blog.create({ data: { title, content, author } }),
    ]);
  } catch (error) {
    console.error("Database error:", error);
    redirect("/marketing-nav/blog/write?error=true");
  }
  //성공시
  redirect("/marketing-nav/blog?success=true");
}

export default function blogWritePage() {
  return (
    <div className={styles.writeForm}>
      <form className={styles.inputForm} action={writeBlog}>
        <div className={styles.titleInput}>
          <Input name="title" placeholder="제목" required />
        </div>
        <div className={styles.contentInput}>
          <Textarea name="content" placeholder="내용" required />
        </div>
        <div className={styles.authorInput}>
          <Input name="author" placeholder="작성자" />
        </div>

        <div className={styles.buttonContainer}>
          <Link href="/marketing-nav/blog">
            <Button type="button" className={styles.button}>
              취소하기
            </Button>
          </Link>
          <Button type="submit" className={styles.button}>
            작성하기
          </Button>
        </div>
      </form>
    </div>
  );
}
