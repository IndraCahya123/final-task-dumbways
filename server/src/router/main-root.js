//digunakan untuk memisahkan route dengan file bundle (server.js)
const express = require("express");

const router = express.Router();

const { authentication } = require("../middlewares/Auth");
const { uploadImageFile } = require("../middlewares/uploadImage");

//auth route
const {
    userLogin,
    userRegister,
    checkAuth
} = require("../controllers/auth");

router.post("/login", userLogin);
router.post("/register", userRegister);
router.get("/is-auth", authentication, checkAuth);

//user route
const {
    getUserById,
    editUser,
    deleteUser
} = require("../controllers/users");

router.get("/user", authentication, getUserById);
router.patch("/user", authentication, editUser);
router.delete("/user", authentication, deleteUser);

//link route

const { addBrand, addLinks, getMyLinks } = require("../controllers/links");

router.post("/brand", authentication, uploadImageFile("image", false), addBrand);
router.post("/links", authentication, uploadImageFile("image", false), addLinks);
router.get("/my-links", authentication, getMyLinks);

module.exports = router;