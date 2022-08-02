import styles from "./index.module.css";
import NavbarButton from "../navbarButton";
import { IoLogIn } from "react-icons/io5";
import { TbFileCertificate } from "react-icons/tb";
import { BsFileEarmarkMedicalFill } from "react-icons/bs";



export default function Navbar() {
  return (
    <div className={styles.container}>
      <div className={styles["buttons-container"]}>
        <NavbarButton title={"Login"} to={"/login"} Icon={IoLogIn} />
        <NavbarButton
          title={"Request a Certificate"}
          to={"/uploadReqForm"}
          Icon={BsFileEarmarkMedicalFill}
        />
      </div>
    </div>
  );
}
