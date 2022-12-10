import React from "react";
import styles from "./index.module.css";
import axios from "axios";
import { useForm } from "react-hook-form";

export default function Uploud() {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("requestFile", data.requestFile[0]);
    formData.append("certificateName", data.certificateName);
    axios
      .post("http://debian.wsl:8008/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response.data)
      .then((file) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([file]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${"username " + Date.now()}.crt`); // TODO: add username + date to the name of the cert

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();

        // Clean up and remove the link
        link.parentNode.removeChild(link);
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
