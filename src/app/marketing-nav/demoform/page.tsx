import { ReactNode } from "react"; // 데모 신청 폼 컴포넌트를 위한 타입 정의
import styles from "./demoform.module.css"; // 스타일 파일을 임포트합니다

export default function DemoFormPage({ demoForm }: { demoForm: ReactNode }) {
  return (
    <div className={styles.demoForm}>
      {demoForm} {/* 데모 신청 폼 컴포넌트가 여기에 렌더링됩니다 */}
      <h1>서비스 데모 신청</h1>
      <p>아래에 서비스 데모 신청 폼을 작성해 주세요.</p> <br />
      <form className={styles.inputform}>
        <div className={styles.form}>
          <div>
            <label htmlFor="name" className={styles.required}>
              1. 성함
            </label>
            <br />
            <input className={styles.inputbox}
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
            <input className={styles.inputbox}
              type="company"
              id="company"
              name="company"
              placeholder="근무지를 적어주세요"
              required
            />
          </div>
          <div>
            <label htmlFor="email"  className={styles.required}>
              3. 이메일
            </label>
            <br />
            <input className={styles.inputbox}
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
            <input className={styles.inputbox}
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
              required
            ></textarea>
          </div>
          <button type="submit" className={styles.button}>신청하기</button>
        </div>
      </form>
    </div>
  );
}
