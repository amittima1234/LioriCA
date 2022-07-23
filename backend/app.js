const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();
const port = 8008;

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

app.post("/submitReq", (req, res) => {
  const reqName = req.body.reqMD5;
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
