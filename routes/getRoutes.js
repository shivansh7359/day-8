const express = require("express");
const router = express.Router();
const main = require("../scapreFn/scrape");
const fs = require("fs");
const path = require("path");

router.post("/indeed", async(req,res) => {
    try{
        const {skill} = req.body;
        let scrp = await main(skill);
        return res.status(200).json({
            status: "ok",
            list: scrp?.list || {}
        });

    }
    catch(error){
        console.log(error);
    }
});

router.get("/getData", async(req, res) => {
    try{
        const jobs = path.join(__dirname, "../", "job.json");
        return res.status(200).sendFile(jobs);
    }
    catch(e){
        console.log(e);
    }
})


module.exports = router;