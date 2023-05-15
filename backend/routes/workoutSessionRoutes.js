const router = require("express").Router();
const bodyParser = require('body-parser');
router.use(bodyParser.json());
const session = require("../models/workoutSessions.js")

const {
    addSession,
    getSessions,
    getSessionDay,
    deleteSession,
    getSessionDetails
} = require('../controllers/workoutSessionController')

router.post("/addSession", addSession)

router.get('/:id', getSessions)

router.get('/:id/:dayIndex', getSessionDay)

router.delete('/:id/:dayIndex', deleteSession)

router.get('/:id/:sessionNumber/:dayIndex', getSessionDetails)



module.exports = router;