import { ReactNode } from "react"; // 데모 신청 폼 컴포넌트를 위한 타입 정의
import styles from "./demoform.module.css"; // 스타일 파일을 임포트합니다
import { prisma } from "@/lib/prisma"; // Prisma 클라이언트를 임포트합니다
import { redirect } from "next/navigation"; // 리다이렉트를 위한 함수 임포트

//Server Action 함수
async function applyForm(formData: FormData) {
  "use server"; // Server Action임을 명시합니다

  const name = formData.get("name")?.toString();
  const company = formData.get("company")?.toString();
  const email = formData.get("email")?.toString();
  const phone = formData.get("phone")?.toString();
  const message = formData.get("message")?.toString();

  // 필수 필드 유효성 검사
  if (!name || !company || !email || !phone) {
    redirect("/marketing-nav/demoform?validation=true");
    return;
  }

  // 데이터베이스에 신청 정보 저장
  try {
    await prisma.apply.create({
      data: {
        name, // 유효성 검사를 통과했으므로 확실히 존재
        company, // 유효성 검사를 통과했으므로 확실히 존재
        email, // 유효성 검사를 통과했으므로 확실히 존재
        phone, // 유효성 검사를 통과했으므로 확실히 존재
        message: message || null, // message만 선택적이므로 null 허용
      },
    });
  } catch (error) {
    console.error("Database error:", error);
    // 에러 발생 시 에러 파라미터와 함께 리다이렉트
    redirect("/marketing-nav/demoform?error=true");
  }
  // 성공 시 데모 신청 페이지로 리다이렉트 (URL에 ?success=true 추가)
  redirect("/marketing-nav/demoform?success=true");
}

export default async function DemoFormPage({
  demoForm,
  searchParams,
}: {
  demoForm: ReactNode;
  searchParams?: Promise<{
    success?: string;
    error?: string;
    validation?: null | string;
  }>; // searchParams 타입 정의
}) {
  const asyncSearchParams = await searchParams; // Promise를 해결하여 실제 값을 얻음
  return (
    <div className={styles.demoForm}>
      {demoForm} {/* 데모 신청 폼 컴포넌트가 여기에 렌더링됩니다 */}
      <h1>서비스 데모 신청</h1>
      <p>아래에 서비스 데모 신청 폼을 작성해 주세요.</p> <br />
      {asyncSearchParams?.success === "true" && (
        <div className={styles.successMessage}>신청이 완료되었습니다.</div>
      )}
      {asyncSearchParams?.validation === "true" && (
        <div className={styles.validationMessage}>
          필수 입력란을 모두 채워 주세요.
        </div>
      )}
      {asyncSearchParams?.error === "true" && (
        <div className={styles.errorMessage}>
          오류가 발생했습니다. 다시 시도해 주세요.
        </div>
      )}
      <form className={styles.inputform} action={applyForm}>
        {/* Server Action을 폼의 action으로 지정 */}
        <div className={styles.form}>
          <div>
            <label htmlFor="name" className={styles.required}>
              1. 성함
            </label>
            <br />
            <input
              className={styles.inputbox}
              type="text"
              id="name"
              name="name"
              placeholder="성함과 직함을 적어주세요"
              required
            />
          </div>
          <div>
            <label htmlFor="company" className={styles.required}>
              2. 회사명
            </label>
            <br />
            <input
              className={styles.inputbox}
              type="text"
              id="company"
              name="company"
              placeholder="근무지를 적어주세요"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className={styles.required}>
              3. 이메일
            </label>
            <br />
            <input
              className={styles.inputbox}
              type="email"
              id="email"
              name="email"
              placeholder="회신 받으실 메일 주소를 입력해 주세요"
              required
            />
          </div>
          <div>
            <label htmlFor="phone" className={styles.required}>
              4. 연락처
            </label>
            <br />
            <input
              className={styles.inputbox}
              type="phone"
              id="phone"
              name="phone"
              placeholder="- 없이 입력해 주세요"
              required
            />
          </div>
          <div>
            <label htmlFor="message">문의 사항</label>
            <br />
            <textarea
              className={styles.inquiry}
              id="message"
              name="message"
              rows={4}
              cols={36}
            ></textarea>
          </div>
          <button type="submit" className={styles.button}>
            신청하기
          </button>
        </div>
      </form>
    </div>
  );
}
