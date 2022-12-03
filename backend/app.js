const express = require("express");
const fileUpload = require("express-fileupload");
const { execSync } = require("node:child_process");
const cors = require("cors");
const app = express();
const port = 8008;
app.use(cors());

const CA_FOLDER_PATH = "/home/amit/ca";
const BACKEND_PATH = "/home/amit/git-projects/LioriCA/backend";
const CERT_TYPE = "server";

app.use(express.json());

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/upload", (req, res) => {
  if (req.files) {
    console.log(req.files);
    const requestFile = req.files.requestFile;
    const certificateName = req.body.certificateName; //req.body.fileName;
    console.log(requestFile);
    const uploadPath = "./reqs/" + certificateName + ".req";
    requestFile.mv(uploadPath, (err) => {
      if (err) {
        res.status(404).send(err);
        return;
      } else {
        execSync(
          `./scripts/importAndSubmitReq.sh ${CA_FOLDER_PATH} ${BACKEND_PATH}/reqs/${certificateName}.req ${certificateName} ${CERT_TYPE}`,
          (error, stdout, stderr) => {
            if (error) {
              console.log(`error: ${error.message}`);
              return;
            }
            if (stderr) {
              console.log(`stderr: ${stderr}`);
              return;
            }
            console.log(`stdout: ${stdout}`);
          }
        );
        const fileName = `${CA_FOLDER_PATH}/pki/issued/${certificateName}.crt`;
        res.sendFile(fileName, (err) => {
          if (err) {
            res.send(err);
          } else {
            console.log("Sent:", fileName);
          }
        });
        return;
      }
    });
  } else {
    res.status(400).send("no files were uploaded");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
