import express from 'express';
import getNumber from '../core/getNumber';

const router = express.Router();
router.post('/start', (_, res) => {
    global.ans = getNumber();
    console.log("ans: ", ans);
    res.json({ msg: 'The game has started.' });
});

router.get('/guess', (req, res) => {
    const ans = Number(global.ans);
    const guessNum = Number(req.query.number);
    console.log("guess number: ", guessNum);
    if (!(Number.isInteger(guessNum)) || guessNum > 100 || guessNum < 1) {
        res.status(406).send({msg: `Error: "${req.query.number}" is not a valid number (1 - 100)`});
    }
    else if (ans === guessNum) {
        res.status(200).send({msg: "Equal"})
    }
    else if (ans > guessNum) {
        res.status(200).send({msg: "Bigger"})
    }
    else {
        res.status(200).send({msg: "Smaller"})
    }
    
})

router.post('/restart', (_, res) => {});
export default router;