import React from "react";
import styles from "./index.module.css";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function Uploud() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("requestFile", data.requestFile[0]);
    formData.append("certificateName", data.certificateName);
    axios.post("http://ubuntu2004.wsl:8008/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  };

  return (
    <form
      className={styles["form-container"]}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={styles["form-field"]}>
        <label>First Name</label>
        <input
          placeholder="Your Certificate Name"
          {...register("certificateName")}
        />
      </div>

      <div className={styles["form-field"]}>
        <label>Request File</label>
        <input
          type="file"
          placeholder="Your Request File"
          {...register("requestFile")}
        />
      </div>

      <div>
        <input className={styles["submit-button"]} type="submit" />
      </div>
      
    </form>
  );
}
