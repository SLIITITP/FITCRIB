const Session = require("../models/workoutSessions.js")
const bodyParser = require('body-parser');
const router = require("express").Router();




const addSession = async (req, res) => {
    const newSession = new Session(req.body);
  
    newSession
      .save()
      .then(() => {
        res.json("Session Added");
      })
      .catch((err) => {
        console.log(err);
      });
  };


const getSessions= (req, res) => {
    

    const workoutId = req.params.id;
  
    Session.find({workoutId : workoutId})
      .then((sessions) => {
        if (!sessions) {
          return res.status(404).json({ error: "No Sessions" });
        }
        res.status(200).json(sessions);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).json({ error: "Error with getting sessions", message: err.message });
      });

}

const getSessionDay= (req, res) => {
    
    const day = req.params.dayIndex
    const workoutId = req.params.id;
    console.log(day);
    console.log(workoutId);
  
    Session.find(
      { workoutId: workoutId, day: day }
        )
      .then((sessions) => {
        if (!sessions) {
          return res.status(404).json({ error: "No Sessions" });
        }
        console.log(sessions);
        res.status(200).json(sessions);
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).json({ error: "Error with getting sessions", message: err.message });
      });

}

const deleteSession= (req, res) => {
    
  const day = req.params.dayIndex
  const workoutId = req.params.id;
  console.log(day);
  console.log(workoutId);

  Session.findOneAndRemove(
    { workoutId: workoutId, day: day }
      )
      .then(() => {
        res.status(200).send({status: "Session deleted"});
      })
      .catch((err) => {
        console.log(err.message);
        res.status(500).send({status: "Error deleting Session", error: err.message});
      });

}


const getSessionDetails= (req, res) => {
    

  const workoutId = req.params.id
  const day = req.params.dayIndex
  const sessionNumber = req.params.sessionNumber
  console.log(day)
  console.log(sessionNumber)

  Session.find({workoutId : workoutId, day : day, sessionNumber : sessionNumber})
    .then((sessions) => {
      if (!sessions) {
        return res.status(404).json({ error: "No Sessions details available" });
      }
      res.status(200).json(sessions);
    })
    .catch((err) => {
      console.log(err.message);
      res.status(500).json({ error: "Error with getting sessions", message: err.message });
    });

}




module.exports = {
    addSession,
    getSessions,
    getSessionDay,
    deleteSession,
    getSessionDetails
}