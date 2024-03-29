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
    const {me, messages, sendMessage, startChat, displayStatus} = useChat();
    const [chatBoxes, setChatBoxes] = useState([]);
    const [activeKey, setActiveKey] = useState('');
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

    const createChatBox = (name) => {
        if (chatBoxes.find(c => c.label === name)) return;
        startChat(me, name);
        return makeName(name, me);
    };

    useEffect(() => {
        const key = makeName(messages.name, me);
        if (messages.type === "history") {
            setChatBoxes(cur => cur = 
                [...cur,
                    {
                        label: messages.name,
                        key: key,
                        children: messages.content.length === 0
                            ?
                                <ChatBoxWrapper >
                                    <p style={{ color: "#ccc" }}>No messages...</p>
                                    <FootRef ref={msgFooter} /> 
                                </ChatBoxWrapper>
                            :
                                <ChatBoxWrapper >
                                {messages.content.map(({name, to, body}, i) => {
                                    let temp = activeKey.split('_').filter(c => c !== me)[0];
                                    if (!temp) temp = me
                                    if (name === me && to === temp)
                                        return (
                                                <Message name={name} isMe={true} message={body} key={i} />
                                        )
                                    else if (to === me && name === temp)
                                        return (
                                                <Message name={name} isMe={false} message={body} key={i} />
                                        ) 
                                })}
                                    <FootRef ref={msgFooter} /> 
                                </ChatBoxWrapper>
                    }
                ]
            );
        }
        if (messages.type === "sent") {
            const newState = chatBoxes.map(cur => {
                let temp = activeKey.split('_').filter(c => c !== me)[0];
                if (!temp) temp = me
                if (me === messages.name && temp === messages.to) {
                    const len = cur.children.props["children"][0].length;
                    return {...cur,
                                children: {
                                    ...cur.children,
                                    props:{
                                        ...cur.children.props,
                                        children: cur.children.props['children'].map((c, i) => {
                                            if (i === 0) {
                                                return [...c, <Message name={me} isMe={true} message={messages.content} key={len+1} />];
                                            }
                                            else {
                                                return c
                                            }
                                        })
                                    }
                                }
                            };
                }
                return cur;
            });
          
            setChatBoxes(newState);
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
            {/* <ChatBoxesWrapper>
                {displayMessages()}
                <FootRef ref={msgFooter} />
            </ChatBoxesWrapper> */}
            {/* // TODO */}
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
                onCreate={({name}) => {
                    setActiveKey(createChatBox(name));
                    setModalOpen(false);
                }}
                onCancel={() => {
                    setModalOpen(false);
                }}
                
            />
            {/* <Input
                value={username}
                placeholder="Username"
                style={{ marginBottom: 10 }}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        msgRef.current.focus();
                    }
                }}
            ></Input> */}
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
                    sendMessage(me, temp, msg);
                    setMsg("");
                    setMsgSent(true);
                }}
            ></Input.Search>
            </>
        </>
    )
};

export default ChatRoom;