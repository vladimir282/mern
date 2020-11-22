const {Router} = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const {check, validationResult} = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");
const  router = Router();

// /api/auth/register
router.post(
    "/register",
    [
        check("email", "wrong email").isEmail(),
        check("password", "min chars 6")
            .isLength({min: 6})
    ],
    async (request, response) => {
    try {
        const errors = validationResult(request);
        if (!errors.isEmpty()){
            return response.status(400).json({
                errors: errors.array(),
                message: "wrong data"
            })
        }

        const {email, password} = request.body;

        const candidate = await User.findOne({email});

        if (candidate) {
            return response.status(400).json({message: "already registered"});
        }

        const hashedPassword = await bcrypt.hash(password, 12);
        const user = new User({ email, password: hashedPassword});
        await user.save();
        response.status(200).json({message: "user created"});

    } catch (e) {
        response(500).json({message: "дерьмо"})
    }
});

// /api/auth/login
router.post(
    "/login",
    [
        check("email", "wrong login email").normalizeEmail().isEmail(),
        check("password").exists()
    ],
    async (request, response) => {
    try {
        const errors = validationResult(request);

        if (!errors.isEmpty()){
            return response.status(400).json({
                errors: errors.array(),
                message: "wrong data in login"
            })
        }

        const {email, password} = request.body;

        const user = await User.findOne({email});

        if (!user) {
            return response.status(400).json({message: "wrong user"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return response.status(400).json({message: "wrong pass"});
        }

        const token = jwt.sign({userId: user.id}, config.get("jwtSecret"), {expiresIn: "1h"});

        response.json({token, id: user.id});

    } catch (e) {
        response.status(500).json({message: "дерьмо"})
    }

});

module.exports = router;