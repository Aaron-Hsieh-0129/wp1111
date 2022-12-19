import {useState, useEffect, createContext, useContext} from "react";
import {message} from 'antd';
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { CHATBOX_QUERY, CREATE_CHATBOX_MUTATION, MESSAGE_SUBSCRIPTION, CREATE_MESSAGE_MUTATION } from "../../graphql";

const LOCALSTORAGE_KEY = "save-me";
const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);

const ChatContext = createContext({
   status: {},
   me: "",
   signedIn: false,
   messages: [],
   activeKey: '',
   setMe: () => {},
   setSignedIn: () => {},
   setActiveKey: () => {},
   setMessages: () => {},
   startChat: () => {},
   sendMessage: () => {},
   displayStatus: () => {}, 
   getChatBox: () => {},
   data: {}
});


const ChatProvider = (props) => {
    const [messages, setMessages] = useState([]);
    const [status, setStatus] = useState({});
    const [signedIn, setSignedIn] = useState(false);
    const [me, setMe] = useState(savedMe || '');
    const [activeKey, setActiveKey] = useState('');

    let friend = activeKey.split('_').filter(c => c !== me)[0];
    if (!friend) friend = me;
    const [getChatBox, { data, loading, subscribeToMore }] = useLazyQuery(CHATBOX_QUERY, {
        fetchPolciy: 'cache-and-network',
        variables: {
            name1: me,
            name2: friend
        }
    })

    const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);

    const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);


    useEffect(() => {
        try { 
            let friend = activeKey.split('_').filter(c => c !== me)[0];
            if (!friend) friend = me;
            subscribeToMore({
                document: MESSAGE_SUBSCRIPTION,
                variables: {from: me, to: friend},
                updateQuery: (prev, {subscriptionData}) => {
                    console.log({ prev: prev, subscriptionData: subscriptionData });
                    if (!subscriptionData.data) return prev;
                    const newMessage = subscriptionData.data.message;
                    // console.log(newMessage);
                    return {
                        ...prev.chatbox,
                        chatbox: {
                            name: activeKey,
                            messages: [...prev.chatbox.messages, newMessage]
                        }
                    }
                }
            })
        } catch(e) {}
    }, [subscribeToMore, getChatBox]);


    // const sendData = async (data) => {
    //     await client.send(JSON.stringify(data));
    // };

    // const clearMessages = () => {
    //     sendData(["clear"]);
    // };


    // client.onmessage = (byteString) => {
    //     const {data} = byteString;
    //     const [task, payload] = JSON.parse(data);
    //     switch (task) {
    //         case "init":
    //             setMessages(payload);
    //             break;
    //         case "output":
    //             setMessages({"name": payload[0], "to": payload[1], "content": payload[2], "type": "sent"});
    //             break;
    //         case "status":
    //             setStatus(payload);
    //             break;
    //         case "cleared": {
    //             setMessages([]);
    //             break;
    //         }
    //         case "CHAT_R":
    //             setMessages({"name": payload[1], "type": "history", "content": payload[0]});
    //             break;

    //         default: break;
    //     }
    // };

    // const startChat = (name, to) => {
    //     if (!name || !to) throw new Error('Name or to required.');
    //     sendData(["chat", {
    //         type: 'CHAT',
    //         payload: {name, to},
    //     }]);
    // };

    // const sendMessage = (name, to, body) => {
    //     if (!name || !to || !body) throw new Error('name or to or body required.');
    //     sendData(["message", {
    //         type: "MESSAGE",
    //         payload: {name, to, body},
    //     }]);
    // };

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
                activeKey,
                setMe,
                setSignedIn,
                setActiveKey,
                setMessages,
                startChat,
                sendMessage,
                displayStatus,
                getChatBox,
                data

            }}
            {...props}
        />
    )
};

const useChat = () => useContext(ChatContext);

export {ChatProvider, useChat};