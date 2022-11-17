import React from "react";
import styles from "./index.module.css";
import { useFormik } from "formik";

export default function UploudReqForm() {
  const formik = useFormik({
    initialValues: {
      certName: "",
      reqFile: "",
    },
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("file", values.reqFile);
      formData.append("fileName", values.certName);
      fetch("http://ubuntu2004.wsl:8008/submitReq", {
        method: "POST",
        body: formData,
        headers: { "Content-Type": "multipart/form-data" },
      })
        .then((res) => res.json())
        .then((json) => console.log(json));
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <form className={styles["form-container"]} onSubmit={formik.handleSubmit}>
      <div className={styles["form-field"]}>
        <label htmlFor="certName">Certificate Name</label>
        <input
          id="certName"
          name="certName"
          type="text"
          onChange={formik.handleChange}
          value={formik.values.certName}
        />
      </div>
      <div className={styles["form-field"]}>
        <label htmlFor="reqFile">Request File</label>
        <input
          id="reqFile"
          name="reqFile"
          type="file"
          onChange={formik.handleChange}
          value={formik.values.reqFile}
        />
      </div>
      <div className={styles["form-buttons"]}>
        <div className={styles["submit-button"]}>
          <button type="submit">Upload</button>
        </div>
        <div className={styles["submit-button"]}>
          <button type="submit">Submit</button>
        </div>
      </div>
    </form>
  );
}
