const { Router } = require("express");
const router = Router();
const User = require("../Models/userModel");
const { createHmac, randomBytes } = require("crypto");

router.get("/signin", (req, res) => {
  res.render("signin");
});

router.post("/signin", async (req, res) => {
    const { email, password } = await req.body;
    try {
      const token = await User.matchPasswordAndGenerateToken(email, password);
      // console.log("token", token);
      return res.cookie("token", token).redirect("/");
    } catch (error) {
      return res.render("signin", {
        message: "Incorrect Email/Pasword",
      }); 
    }
});

router.get("/signup", (req, res) => {
  res.render("signup");
});
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });

  return res.redirect("/");
});


router.get("/logout", (req, res) => {
  res.clearCookie("token");
  res.redirect("/");
});

module.exports = router;
