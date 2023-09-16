import React from "react";
import "./NewCertificate.css"
import axios from "axios";
import { useForm } from "react-hook-form";
import fileDownload from 'js-file-download';

export default function NewCertificate() {
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data : any) => {
    const formData = new FormData();
    formData.append("requestFile", data.requestFile[0]);
    formData.append("certificateName", data.certificateName);
    axios
      .patch("http://localhost:8008/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => response.data)
      .then((file) => {
        fileDownload(file, `${"username " + Date.now()}.crt`) // TODO: add username + date to the name of the cert
      });
  };

  return (
    <form
      className={"form-container"}
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className={"form-field"}>
        <label>First Name</label>
        <input
          placeholder="Your Certificate Name"
          {...register("certificateName")}
        />
      </div>

      <div className={"form-field"}>
        <label>Request File</label>
        <input
          type="file"
          placeholder="Your Request File"
          {...register("requestFile")}
        />
      </div>

      <div>
        <input className={"submit-button"} type="submit" />
      </div>
    </form>
  );
}