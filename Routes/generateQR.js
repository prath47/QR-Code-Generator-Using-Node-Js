const { Router, json } = require("express");
const QRCode = require("qrcode");
const qrrouter = Router();
const { isLogin } = require("../middlewares/auth");

qrrouter.post("/", isLogin, async (req, res) => {
  const data = await req.body;

  const stringData = JSON.stringify(data);
  console.log(stringData);

  const url = data.url;
  console.log(url);
  const imgSrc = QRCode.toDataURL(url, function (err, code) {
    if (err) return console.log("error occurred");
    else {
      // Printing the code
      //   console.log(code);
      return res.render("home", {
        // json: true,
        url: url,
        imgSrc: code,
        user: req.user,
      });
    }
  });
});

module.exports = {
  qrrouter,
};
