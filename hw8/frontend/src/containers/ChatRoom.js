/* eslint-disable array-callback-return */
import styled from 'styled-components';
import {useChat} from './hooks/useChat';
import { useState,  useEffect, useRef } from 'react';
import Message from '../components/Message';
import Title from '../components/Title';
import {Input, Tabs} from 'antd';
import ChatModal from '../components/ChatModal';

const ChatBoxesWrapper = styled(Tabs)`
    width: 100%;
    height: 300px;
    background: #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
    overflow: auto;
`;

// TODO
const ChatBoxWrapper = styled.div`
    height: calc(240px - 36px);
    display: flex;
    flex-direction: column;
    // overflow: auto;
`;

const FootRef = styled.div`
    height: 20px;
`;

const ChatRoom = () => {
    const {me, messages, activeKey, sendMessage, startChat, displayStatus, setActiveKey, setMessages, getChatBox, data} = useChat();
    const [chatBoxes, setChatBoxes] = useState([]);
    // const [username, setUsername] = useState("");
    const [msg, setMsg] = useState("");
    const [msgSent, setMsgSent] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const msgRef = useRef(null);
    const msgFooter = useRef(null);

    // const displayMessages = () => (
    //     messages.length === 0 ? (
    //         <p style={{ color: "#ccc" }}>No messages...</p>
    //     ) : (
    //         messages.map(({ name, body }, i) => (
    //             <Message name={name} isMe={name === me} message={body} key={i} />
    //         ))
    //     )
    // );

    const makeName = (name, to) => {
        return [name, to].sort().join('_');
    }

    const createChatBox = async (name) => {
        if (chatBoxes.find(c => c.label === name)) return;
        await startChat({variables: {name1: me, name2: name}}).then((result) => {
            setMessages(result.data.createChatBox);
        });

        getChatBox();
        return makeName(name, me);
    };

    useEffect(() => {
        if (messages.length !== 0) {
            if (messages?.messages) {
                let temp = activeKey.split('_').filter(c => c !== me)[0];
                if (!temp) temp = me
                setChatBoxes(cur => cur = 
                    [...cur,
                        {
                            label: temp,
                            key: messages.name,
                            children: messages.messages.length === 0
                                ?
                                    <ChatBoxWrapper >
                                        <p style={{ color: "#ccc" }}>No messages...</p>
                                        <FootRef ref={msgFooter} /> 
                                    </ChatBoxWrapper>
                                :
                                    <ChatBoxWrapper >
                                    {messages.messages.map(({sender, body}, i) => {
                                        let to = messages.name.split('_').filter(c => c !== sender)[0];
                                        if (!to) to = sender;

                                        
                                        if (sender === me && to === temp)
                                            return (
                                                    <Message name={sender} isMe={true} message={body} key={i} />
                                            )
                                        else if (to === me && sender === temp)
                                            return (
                                                    <Message name={sender} isMe={false} message={body} key={i} />
                                            ) 
                                    })}
                                        <FootRef ref={msgFooter} /> 
                                    </ChatBoxWrapper>
                        }
                    ]
                );
            }
            else {
                const newState = chatBoxes.map(cur => {
                    if (me === messages[0].sender) {
                        const len = cur.children.props["children"][0].length;
                        // console.log(cur.children.props['children'][0])
                        // console.log(cur.children.props['children'])
                        if (cur.children.props['children'][0].key !== null) {
                            return {...cur,
                                children: {
                                    ...cur.children,
                                    props:{
                                        ...cur.children.props,
                                        children: cur.children.props['children'].map((c, i) => {
                                            if (i === 0) {
                                                return [...c, <Message name={me} isMe={true} message={messages[0].body} key={len+1} />];
                                            }
                                            else {
                                                return c
                                            }
                                        })
                                    }
                                }
                            };
                        }
                        else {
                            return {...cur,
                                children: {
                                    ...cur.children,
                                    props:{
                                        ...cur.children.props,
                                        children: cur.children.props['children'].map((c, i) => {
                                            if (i === 0) {
                                                return [<Message name={me} isMe={true} message={messages[0].body} key={len+1} />];
                                            }
                                            else {
                                                return c
                                            }
                                        })
                                    }
                                }
                            };
                        }
                        
                    }
                    return cur;
                });

                let temp = activeKey.split('_').filter(c => c !== me)[0];
                if (!temp) temp = me
                
                setChatBoxes(newState);
            }
        }
        
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [messages]);
    

    const scrollToBottom = () => {
        msgFooter.current?.scrollIntoView({behavior: 'smooth', block: 'start'});
    };
    useEffect(() => {
        scrollToBottom();
        setMsgSent(false);
    }, [msgSent, chatBoxes]);

    return (
        <>
            <Title name={me} />
            <>
            <ChatBoxesWrapper 
                tabBarStyle={{height: '36px'}}
                type="editable-card"
                activeKey={activeKey}
                onChange={(key) => {
                    setActiveKey(key);
                    // extractChat(key);
                }}
                onEdit={(targetKey, action) => {
                    if (action === 'add') {
                        setModalOpen(true);
                    }
                    else if (action === 'remove') {
                        const delIndex = chatBoxes.findIndex(c => c.key === targetKey);

                        if (chatBoxes.length > 1) {
                            if (delIndex === chatBoxes.length - 1) {
                                setActiveKey(chatBoxes[delIndex - 1].key);
                            }
                            else {
                                setActiveKey(chatBoxes[delIndex + 1].key);
                            }
                        }
                        setChatBoxes(cur => cur.filter(c => c.key !== targetKey));                      
                    }
                }}
                items={chatBoxes}
            ></ChatBoxesWrapper>
            <ChatModal
                open={modalOpen}
                onCreate={async ({name}) => {
                    setActiveKey(makeName(me, name));
                    createChatBox(name);
                    setModalOpen(false);
                }}
                onCancel={() => {
                    setModalOpen(false);
                }}
                
            />
            <Input.Search
                ref={msgRef}
                value={msg}
                onChange={(e) => {
                    setMsg(e.target.value);
                }}
                enterButton="Send"
                placeholder="Type a message here..."
                onSearch={(msg) => {
                    if (!msg) {
                        displayStatus({
                            type: 'error',
                            msg: 'Please enter a message body.'
                        });
                        return;
                    }
                    let temp = activeKey.split('_').filter(c => c !== me)[0];
                    if (!temp) temp = me
                    sendMessage({variables: {name: me, to: temp, body: msg}}).then((result) => {
                        getChatBox();
                        setMessages([result.data.createMessage]);
                        // console.log(messages);
                        // console.log(chatBoxes)
                    });
                    
                    // setMessages([da])
                    // console.log("data: ", data);
                    // console.log("mes: ", data.chatbox.messages[data.chatbox.messages.length - 1])
                    // setMessages(msg)
                    // console.log("mmmmes: ", messages);
                    setMsg("");
                    setMsgSent(true);
                }}
            ></Input.Search>
            </>
        </>
    )
};

export default ChatRoom;