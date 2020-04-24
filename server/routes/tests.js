const express = require("express");
const Router = express.Router();
const auth = require("../middleware/auth");
const db = require("../database/db");
const Test = db.test;

//Add a new Test
Router.post("/", auth, async(req, res) => {
    try {
        const test = await Test.create({
            ...req.body.test
        })
        return res.json({ test }  );
    } catch (error) {
        console.log('====================================');
        console.log(error.message);
        console.log('====================================');
        return res.status(402).json({ msg: "Server Error" });
    }
})

//get all tests
Router.get( "/", auth, async (req, res) => {
    try {
      const test = await Test.findAll({
        // where: {call_id: req.params.call_id},
        // include:[
        //     {
        //         model: Note
        //     }
        // ],
        // order: [ [Note, 'createdAt', 'DESC'] ]
      });
        return res.json({ test }  );
    } catch (error) {
      console.log(error.message);
      return res.status(402).json({ msg: "Server Error" });
    }
});

module.exports = Router;