
const isLogin = async (req, res, next) => {
    console.log("here")
    try {
        if (req.user) {

        } else {
            res.redirect("/user/signin");
        }
        next();
    } catch (error) {
        console.log(error);
    }
};

const isLogout = async (req, res, next) => {
    // console.log("here")
    try {
        if (req.user) {
            res.redirect('/')
        } else {
        }
        next();
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    isLogin,
    isLogout,
};
