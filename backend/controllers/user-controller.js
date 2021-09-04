const fs = require("fs");
const path = require("path");
const express = require("express");
const user_logic = require("../bll/user-logic");
const verifyLoggedIn = require("../middlewares/verifyLoggedIn");
const router = express.Router();
const { getError } = require("../helpers/errors-helper");


// get all  vacations /api/uservacations
router.get("/uservacations/:uuid", (verifyLoggedIn), async (request, response) => {
    try {
        const uuid = request.params.uuid
        const vacations = await user_logic.getUserVacationsAsync(uuid);
        response.json(vacations);
    } catch (err) {
        response.status(500).send(getError(err));
    }
});



router.put("/vacations", async (request, response) => {
    try {
        const followVacation = request.body
        console.log(followVacation)
        const followedVacation = await user_logic.followVacationAsync(followVacation);
        response.json(followedVacation);
    } catch (err) {
        response.status(500).send(getError(err));
    }
});


router.get("/images/:name", (request, response) => {
    try {
        const name = request.params.name;
        let absolutePath = path.join(__dirname, "..", "images", name);
        if (!fs.existsSync(absolutePath)) {
            absolutePath = path.join(__dirname, "..", "images", "not-found.png");
        }
        response.sendFile(absolutePath);
    } catch (err) {
        response.status(500).send(getError(err));
    }
});



module.exports = router;
