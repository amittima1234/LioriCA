import React from "react";
import styles from "./index.module.css";
import { Link } from "react-router-dom";

export default function NavbarButton({ title, to, Icon }) {
  return (
    <Link className={styles.container} to={to}>
      <span className={styles.icon}>
        <Icon />
      </span>
      <div className={styles.text}>
        <span className={styles.text}>{title}</span>
      </div>
    </Link>
  );
}
