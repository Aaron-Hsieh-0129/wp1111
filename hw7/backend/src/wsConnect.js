import Message from './models/message';
import {MessageModel, UserModel, ChatBoxModel} from './models/chatbox';

const makeName = (name, to) => {
    return [name, to].sort().join('_');
}

const validateUser = async (name) => {
    console.log("Finding..." + name);
    const existing = await UserModel.findOne({name});
    console.log(existing);
    if (existing) return existing;
    // TODO
}

const sendData = (data, ws) => {
    ws.send(JSON.stringify(data));
}
const sendStatus = (payload, ws) => {
    sendData(["status", payload], ws);
};

const broadcastMessage = (clients, data, status, name) => {
    clients.forEach((client) => {
        sendData(data, client);
    });
}

export default {
    initData: (ws) => {
        Message.find().sort({created_at: -1}).limit(100).exec((err, res) => {
            if (err) throw err;
            sendData(["init", res], ws);
        });
    },
    onMessage: (ws, clients) => (
        async (byteString) => {
            const {data} = byteString;
            const [task, payload] = JSON.parse(data);
            switch(task) {
                // TODO
                // case 'input':
                //     const {name, body} = payload;
                //     console.log(payload);
                //     const message = new Message({name, body});
                //     try {
                //         await message.save();
                //     } catch (e) {
                //         throw new Error("Message DB save error: " + e);
                //     }

                //     broadcastMessage(
                //         wss,
                //         ["output", [payload]],
                //         {
                //             type: "success",
                //             msg: "Message sent",
                //         }
                //     );
                //     break;

                // case "clear": {
                //     Message.deleteMany({}, () => {
                //         broadcastMessage(
                //             wss,
                //             ['cleared'],
                //             {type: 'info', msg: 'Message cache cleared.'}
                //         )
                //     })
                //     break;
                // }
                case 'input':
                    const {name, body} = payload;
                    const message = new Message({name, body});
                    try {
                        await message.save();
                    } catch (e) {
                        throw new Error("Message DB save error: " + e);
                    }

                    sendData(['output', [payload]], ws);
                    sendStatus({
                        type: "success",
                        msg: "Message sent."
                    }, ws);
                    break;

                case "clear": {
                    Message.deleteMany({}, () => {
                        sendData(['cleared'], ws);
                        sendStatus({type: 'info', msg: 'Message cache cleared.'}, ws);
                    })
                    break;
                }
                case "chat": {
                    const {name, to} = payload['payload'];
                    const type = payload['type'];
                    if (type === "CHAT") {
                        Message.find({"name": {"$in": [name, to]}}).sort({created_at: -1}).exec((err, res) => {
                            if (err) throw err;
                            sendData(['CHAT_R', [res, to]], ws);
                        });
                    }
                    break;
                }
                case "message": {
                    const {name, to, body} = payload['payload'];
                    const type = payload['type'];
                    if (type === "MESSAGE") {
                        const message = new Message({name, to, body});
                        try {
                            await message.save();
                        } catch (e) {
                            throw new Error("Message DB save error: " + e);
                        }
                        // sendData(['output', [name, to, body]], ws);
                        

                        broadcastMessage(
                            clients,
                            ["output", [name, to, body]],
                            {
                                type: "success",
                                msg: "Message sent",
                            },
                        );

                        sendStatus({
                            type: "success",
                            msg: "Message sent."
                        }, ws);
                        
                        break;
    
                    }
                    break;
                }

                default: break;        
            }
        }
    )
}