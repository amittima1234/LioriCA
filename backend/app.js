const express = require("express");
const fileUpload = require("express-fileupload");
const { execSync } = require("node:child_process");
const { MongoClient } = require("mongodb");
const fs = require("node:fs");
const cors = require("cors");
const app = express();

require("dotenv").config();

app.use(cors());

const CA_FOLDER_PATH = `${require("os").homedir()}/ca/easy-rsa`; //`${process.env.CA_FOLDER_PATH}`;
const BACKEND_PORT = 8008; //`${process.env.BACKEND_PORT}`;
const CERT_TYPE = "server";
const MONGODB_URL = "mongodb://0.0.0.0:9000/LioriCA"; // MongoDB connection string with the database name

const client = new MongoClient(MONGODB_URL, { useUnifiedTopology: true }); // Create a connection pool

let db;
// Connect to MongoDB
async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db();
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
}

app.use(express.json());
app.use(express.static("build"));

app.use(
  fileUpload({
    createParentPath: true,
  })
);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.patch("/upload", (req, res) => {
  if (req.files) {
    const requestFile = req.files.file;
    const certificateName = req.body.name;
    const uploadPath = "./reqs/" + certificateName + ".req";
    console.log(uploadPath);
    requestFile.mv(uploadPath, (err) => {
      if (err) {
        res.status(404).send(err);
      } else {
        const issuedCertificate = issueNewCert(certificateName);
        res.sendFile(issuedCertificate, (err) => {
          if (err) {
            res.send(err);
            console.log(err);
            console.log(issuedCertificate);
          } else {
            console.log("Sent:", issuedCertificate);
            const certificateFile = fs.readFileSync(issuedCertificate, "utf8");
            const newCertificate = {
              certificateName,
              certificateFile,
              requestFile,
            };
            db.collection("certificates").insertOne(newCertificate);
          }
        });
      }
    });
  } else {
    res.status(400).send("no files were uploaded");
  }
});

const issueNewCert = (certificateName) => {
  execSync(
    `./scripts/importAndSubmitReq.sh ${CA_FOLDER_PATH} ${__dirname}/reqs/${certificateName}.req ${certificateName} ${CERT_TYPE}`,
    (error, stdout, stderr) => {
      if (error) {
        console.log(`error: ${error.message}`);
      } else if (stderr) {
        console.log(`stderr: ${stderr}`);
      } else {
        console.log(`stdout: ${stdout}`);
      }
    }
  );
  return `${CA_FOLDER_PATH}/pki/issued/${certificateName}.crt`;
};

app.listen(BACKEND_PORT, () => {
  connectToDatabase();
  console.log(`Example app listening on port ${BACKEND_PORT}`);
});
