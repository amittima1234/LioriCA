import styles from "./index.module.css";
import NavbarButton from "../navbarButton";

export default function Navbar () {
  return (
    <div className={styles.navbar} >
      <NavbarButton title={"Login"} to={"/login"} />
      <NavbarButton title={"Request a certificate"} to={"/uploadReqForm"} />
    </div>
  );
};
