import React from 'react';
import styles from "./index.module.css";

export default function HomePage() {
  return (
    <header className={styles.header}>
        <div className={styles["text-box"]}>
            <h1 className={styles["heading-primary"]}>
                <span className={styles["heading-primary-main"]}>Liori-CA</span>
                <span className={styles["heading-primary-sub"]}>פה מקבלים תעודות</span>
            </h1>

            <a href="/login" className={`${styles.btn} ${styles["btn-white"]} ${styles["btn-animated"]}`}>התחברות</a>
        </div>
    </header>
  );
}
