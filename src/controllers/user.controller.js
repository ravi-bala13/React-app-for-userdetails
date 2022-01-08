const express = require("express");

const router = express.Router();

const User = require("../models/user.model");

router.post("/", async (req, res) => {
    try {
        // console.log(req.body)
        const user = await User.create(req.body);

        return res.status(200).send(user)
    } catch (e) {
        return res.status(500).json({message: e.message, status:"Failed"})
        
    }
})

router.get("/", async (req, res) => {
    try {
        const user = await User.find().lean().exec();
        // console.log(user)
        return res.status(200).send(user)
    } catch (e) {
        return res.status(500).json({message: e.message, status:"Failed"})
        
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const user = await User.deleteOne({_id: req.params.id}).lean().exec();
        console.log(req.params.id)
        return res.status(200).send(user)
    } catch (e) {
        return res.status(500).json({message: e.message, status:"Failed"})
        
    }
})

module.exports = router;