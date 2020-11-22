const {Router} = require("express");
const Link = require("../models/link");
const auth = require("../middleware/auth.middleware");
const config = require("config");
const shortid = require('shortid');
const  router = Router();

// /api/auth/generate
router.post("/generate",
    auth,
    async (request, response) => {
        try {
            const baseUrl = config.get("baseUrl");
            const { from } = request.body;
            const code = shortid.generate();

            const exist = await Link.findOne({from});

            if (exist) {
                return response.json({link: exist})
            }

            const to = baseUrl + "t/" + code;

            const link = new Link({
                from, to, owner: request.user.userId, code
            })

            await link.save();

            response.status(201).json({link});

        } catch (e) {
            response.status(500).json({message: "дерьмо c генерацией ссылкой"})
        }
    });


router.get(
    "/",
    auth,
    async (request, response) => {
        try {
            const links = await Link.find({owner: request.user.userId})
            response.json(links);

        } catch (e) {
            response.status(500).json({message: "дерьмо с получением ссылок"})
        }

    });


router.get(
    "/:id",
    auth,
    async (request, response) => {
        try {
            const link = await Link.findById(request.params.id)
            response.json(link);

        } catch (e) {
            response.status(500).json({message: "дерьмо с получением ссылок"})
        }

    });


module.exports = router;