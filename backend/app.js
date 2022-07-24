const express = require("express");
const fileUpload = require("express-fileupload");
const { execSync } = require("node:child_process");
const app = express();
const port = 8008;

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

app.post("/uploadReq", (req, res) => {
  if (req.files) {
    console.log(req.files);
    const REQFile = req.files.REQFile;
    console.log(REQFile);
    const uploadPath = "./reqs/" + REQFile.md5 + ".req";
    REQFile.mv(uploadPath, (err) => {
      if (err) {
        res.status(404).send(err);
        return;
      } else {
        res.status(200).send(REQFile.md5);
        return;
      }
    });
  } else {
    res.status(400).send("no files were uploaded");
  }
});

app.post("/submitReq", async (req, res) => {
  console.log(req.body);
  const reqName = req.body.reqMD5;
  execSync(
    `./scripts/importAndSubmitReq.sh ${CA_FOLDER_PATH} ${BACKEND_PATH}/reqs/${reqName}.req ${reqName} ${CERT_TYPE}`,
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
  const fileName = `${CA_FOLDER_PATH}/pki/issued/${reqName}.crt`
  res.sendFile(fileName, function (err) {
    if (err) {
      res.send(err);
    } else {
      console.log("Sent:", fileName);
    }
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
