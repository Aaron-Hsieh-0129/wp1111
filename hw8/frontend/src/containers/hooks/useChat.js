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
                    // console.log({ prev: prev, subscriptionData: subscriptionData });
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
    }, [subscribeToMore, data]);

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