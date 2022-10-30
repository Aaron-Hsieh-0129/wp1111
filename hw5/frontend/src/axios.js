import axios from 'axios'

const instance = axios.create({baseURL: 'http://localhost:4000/api/guess'});
const startGame = async () => {
    const {data: {msg}} = await instance.post('/start');
    console.log(msg);
    return msg;
}
const guess = async (number) => {
    try {
        const {data: {msg}} = await instance.get('/guess', { params: {number}});
        console.log(msg)
        return msg;
    }
    catch (error) {
        let msg = JSON.parse(error['request'].response)['msg'];
        return msg;
    }
}

const restart = async () => {
    const {data: {msg}} = await instance.post('/start');
    console.log(msg);
    return msg;
};
export {startGame, guess, restart}