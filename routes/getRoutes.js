const express = require("express");
const router = express.Router();
const main = require("../scapreFn/scrape");

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

module.exports = router;