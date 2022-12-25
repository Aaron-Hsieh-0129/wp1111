import { query, Router } from "express";
import ScoreCard from "../models/ScoreCard";

const router = Router();

// delete
router.delete("/cards", async (_, res) => {
    try {
        await ScoreCard.deleteMany({});
        res.json({message: "Database cleared"});
    } catch(e) {
        console.log(e);
        res.json({message: "card deleting wrong"})
    }
});

// add
router.post("/card", async (req, res) => {
    try {
        // console.log("body: ", req.body);
        const {name, subject, score} = req.body;
        const check = await ScoreCard.findOne({name, subject});
        
        const dic = {}
        dic['name'] = name;
        // const findOnePerson = await ScoreCard.find(dic);
        // console.log(findOnePerson)

        if (check) {
            await ScoreCard.updateOne({name, subject}, {score});
            const findOnePerson = await ScoreCard.find(dic);
            res.json({
                message: `Updating (${name}, ${subject}, ${score})`,
                card: {name, subject, score},
                rows: findOnePerson
            });
        }
        else {
            const tmp = new ScoreCard({name, subject, score});
            await tmp.save();
            const findOnePerson = await ScoreCard.find(dic);
            res.json({
                message: `Adding (${name}, ${subject}, ${score})`,
                card: {name, subject, score},
                rows: findOnePerson
            });
        }
        
    } catch(e) {
        console.log(e);
        res.json({message: "card adding wrong"});
    }
});

// query
router.get("/cards", async (req, res) => {
    try {
        const {type, queryString} = req.query;
        const tmp = {}
        tmp[type] = queryString
        const queryFind = await ScoreCard.find(tmp);

        if (queryFind.length === 0) {
            res.json({
                message: `${type.charAt(0).toUpperCase()}${type.slice(1, type.length)}  (${queryString}) not found!`,
            });
        }
        else {
            res.json({
                messages: queryFind.map(
                    (card) => {
                        return `Found card with ${type}: (${card.name}, ${card.subject}, ${card.score})`;
                    }
                ),
                queryRow: queryFind
            });
        }

    } catch(e) {
        res.json({message: "card searching wrong"});
    }
});


export default router;