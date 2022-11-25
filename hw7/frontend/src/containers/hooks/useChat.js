import {useState, useEffect, createContext, useContext} from "react";
import {message} from 'antd';

const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

const ChatContext = createContext({
   status: {},
   me: "",
   signedIn: false,
   messages: [],
   startChat: () => {},
   sendMessage: () => {},
   clearMessages: () => {}, 
});

const client = new WebSocket('ws://localhost:4000');

const ChatProvider = (props) => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});
    const [signedIn, setSignedIn] = useState(false);
    const [me, setMe] = useState(savedMe || '');


    const sendData = async (data) => {
        await client.send(JSON.stringify(data));
    };

    const clearMessages = () => {
        sendData(["clear"]);
    };


    client.onmessage = (byteString) => {
        const {data} = byteString;
        const [task, payload] = JSON.parse(data);
        switch (task) {
            case "init":
                setMessages(payload);
                break;
            case "output":
                setMessages(() => [...messages, ...payload]);
                break;
            case "status":
                setStatus(payload);
                break;
            case "cleared": {
                setMessages([]);
                break;
            }
            default: break;
        }   
    };

    const startChat = (name, to) => {
        if (!name || !to) throw new Error('Name or to required.');
        sendData({
            type: 'CHAT',
            payload: {name, to},
        });
    };

    const sendMessage = (payload) => {
    // TODO 
    // const sendMessage = (name, to, body) => {
        // if (!name || !to || !body) throw new Error('name or to or body required.');
        // sendData({
        //     type: "MESSAGE",
        //     payload: {name, to, body},
        // });

        console.log(payload);
        sendData(["input", payload]);
    };

    const displayStatus = (payload) => {
        if (payload.msg) {
            const { type, msg } = payload;
            const content = { content: msg, duration: 0.5 };
            switch (type) {
                case "success":
                    message.success(content);
                    break;
                case "error":
                default:
                    message.error(content);
                    break;
            }
        }
    };

    useEffect(() => {
        if (signedIn) {
            localStorage.setItem(LOCALSTORAGE_KEY, me);
        }
    }, [me, signedIn]);

    return (
        <ChatContext.Provider 
            value={{
                status,
                me,
                signedIn,
                messages,
                setMe,
                setSignedIn,
                startChat,
                sendMessage,
                clearMessages,
                displayStatus
            }}
            {...props}
        />
    )
};

const useChat = () => useContext(ChatContext);

export {ChatProvider, useChat};