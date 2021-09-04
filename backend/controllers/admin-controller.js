const { request } = require("express");
const express = require("express");
const admin_logic = require("../bll/admin-logic");
const isAdmin = require("../middlewares/isAdmin");
const VacationModel = require("../Models/VacationModel");
const router = express.Router();
const { getError } = require("../helpers/errors-helper");


router.get("/vacations", async (_request, response) => {
    try {
        const vacations = await admin_logic.getAllVacationsAsync();
        response.json(vacations);
    } catch (err) {
        response.status(500).send(getError(err));
    }
});

// get one vacation  for get vacation details on EditVacation page
router.get("/vacationDetails/:id", async (request, response) => {
    try {
        const vacation_id = +request.params.id
        const vacation = await admin_logic.getOneVacationsAsync(vacation_id);
        response.json(vacation);
    } catch (err) {
        response.status(500).send(getError(err));
    }
});

router.get("/followers", async (_request, response) => {
    try {
        const followers = await admin_logic.getFollowersAsync();
        response.json(followers);
    } catch (err) {
        response.status(500).send(getError(err));
    }
});

router.post("/vacations", (isAdmin), async (request, response) => {
    try {
        const vacation = new VacationModel(request.body);
        const image =
            request.files && request.files.image_file ? request.files.image_file : null;
        if (!image) return response.status(400).send("Missing image.");
        const addedvacation = await admin_logic.AddVacationAsync(vacation, image);
        response.json(addedvacation);
    } catch (err) {
        response.status(500).send(getError(err));
    }
});

//Edit vacation
router.put("/vacations/:id", (isAdmin), async (request, response) => {
    try {
        const vacation = request.body
        vacation.vacation_id = +request.params.id
        const image =
            request.files && request.files.image_file ? request.files.image_file : null;
        if (!image) {
            delete vacation.image_file
        }
        const updatedvacation = await admin_logic.EditVacationAsync(vacation, image);
        response.json(updatedvacation);

    } catch (err) {
        response.status(500).send(getError(err));
    }
});



router.delete("/vacations/:id", async (request, response) => {
    try {
        const vacation_id = +request.params.id
        const vacationDeleted = await admin_logic.DeleteVacationAsync(vacation_id);
        response.json(vacationDeleted);
    } catch (err) {
        response.status(500).send(getError(err));
    }
});


module.exports = router;
