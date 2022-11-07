import { Router } from "express";
import ScoreCard from "../models/ScoreCard";

const router = Router();

router.delete("/cards", async (_, res) => {
    try {
        await ScoreCard.deleteMany({});
        res.json({message: "Database cleared"});
    } catch(e) {
        console.log(e);
        res.json({message: "card deleting wrong"})
    }
});

router.post("/card", async (req, res) => {
    try {
        console.log("body: ", req.body);
        const {name, subject, score} = req.body;
        const check = await ScoreCard.findOne({name, subject});
        if (check) {
            await ScoreCard.updateOne({name, subject}, {score});
            res.json({
                message: `Updating (${name}, ${subject}, ${score})`,
                card: {name, subject, score}
            });
        }
        else {
            new ScoreCard({name, subject, score}).save();
            res.json({
                message: `Adding (${name}, ${subject}, ${score})`,
                card: {name, subject, score}
            });
        }
        
    } catch(e) {
        console.log(e);
        res.json({message: "card adding wrong"});
    }
});

router.get("/cards", async (req, res) => {
    try {
        console.log(req.query);
        const {type, queryString} = req.query;
        const tmp = {}
        tmp[type] = queryString
        const queryFind = await ScoreCard.find(tmp);
        console.log(queryFind);

        if (queryFind.length === 0) {
            console.log("Not Found");
            res.json({
                message: `${type.charAt(0).toUpperCase()}${type.slice(1, type.length)}  (${queryString}) not found!`,
            });
        }
        else {
            console.log("Found");
            res.json({
                messages: queryFind.map(
                    (card) => {
                        return `Found card with ${type}: (${card.name}, ${card.subject}, ${card.score})`;
                    }
                )
            });
        }

    } catch(e) {
        console.log(e);
        res.json({message: "card searching wrong"});
    }
});

export default router;