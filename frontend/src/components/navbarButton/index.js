import styles from "./index.module.css";
import { Link } from "react-router-dom";

export default function NavbarButton({ title, to }) {
  return (
    <Link className={styles["navnabr-button"]} to={to}>
      {title}
    </Link>
  );
}
