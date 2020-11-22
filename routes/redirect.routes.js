const {Router} = require("express");
const Link = require("../models/link");
const bcrypt = require("bcryptjs");
const {check, validationResult} = require("express-validator");
const config = require("config");
const jwt = require("jsonwebtoken");
const  router = Router();

router.get("/:code", async (req, res) => {
    try {
        const link = await Link.findOne({code: req.params.code});

        if (link) {
            link.clicks++;
            await link.save();
            return res.redirect(link.from);
        }

        res.status(404).json("Ссылка не найдена");

    } catch (e) {
        res.status(500).json({message: "redirect error"})
    }
})

module.exports = router;