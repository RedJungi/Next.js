import { ReactNode } from "react";
import styles from "./main.module.css";

export default function Main({ main }: { main: ReactNode }) {
  return (
    <div className={styles.main}>
      {main}
      <section>
        <div className={styles.intro}>
          <div className={styles.ci}>
            <h1>신뢰할 수 있는 IT 플랫폼 더품</h1>
          </div>
          <p>
            다양한 영역에서 검증된 국내외 솔루션을 약 500개의 고객사에 공급하고 있습니다.
          </p>
          <p>
            최소 5년 이상의 기술지원 경험이 있는 기업과 엔지니어가 협업합니다.
          </p>
        </div>
      </section>
    </div>
  );
}
