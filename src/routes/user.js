const express = require("express");
const {createUser, getBirthdays} = require("../controller/user.js") 

const router = express.Router();


router.get("/register", (req, res) => {
	res.render("register");
});

router.get("/create", (req, res) => {
	res.render("create")
})

router.post('/create', createUser)
router.get( '/birthdays', getBirthdays);

module.exports = router;