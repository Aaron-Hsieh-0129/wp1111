import styled from 'styled-components';
import {useChat} from './hooks/useChat';
import { useState,  useEffect, useRef } from 'react';
import Message from '../components/Message';
import Title from '../components/Title';
import {Input} from 'antd';
import ChatModal from '../components/ChatModal';

const ChatBoxesWrapper = styled.div`
    width: 100%;
    height: 300px;
    background: #eeeeee52;
    border-radius: 10px;
    margin: 20px;
    padding: 20px;
    overflow: auto;
`;

// TODO
// const ChatBoxWrapper = styled.div`
//     height: calc(240px - 36px);
//     display: flex;
//     flex-direction: column;
//     overflow: auto;
// `;

const FootRef = styled.div`
    height: 20px;
`;

const ChatRoom = () => {
    const {me, messages, sendMessage, startChat, displayStatus} = useChat();
    const [chatBoxes, setChatBoxes] = useState([]);
    const [activeKey, setActiveKey] = useState('');
    const [username, setUsername] = useState("");
    const [msg, setMsg] = useState("");
    const [msgSent, setMsgSent] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);

    const msgRef = useRef(null);
    const msgFooter = useRef(null);

    const displayMessages = () => (
        messages.length === 0 ? (
            <p style={{ color: "#ccc" }}>No messages...</p>
        ) : (
            messages.map(({ name, body }, i) => (
                <Message name={name} isMe={name === me} message={body} key={i} />
            ))
        )
    );

    const scrollToBottom = () => {
        msgFooter.current?.scrollIntoView({behavior: 'smooth', block: 'start'});
    };
    useEffect(() => {
        scrollToBottom();
        setMsgSent(false);
    }, [msgSent]);

    return (
        <>
            <Title name={me} />
            <ChatBoxesWrapper>
                {displayMessages()}
                <FootRef ref={msgFooter} />
            </ChatBoxesWrapper>
            {/* // TODO */}
            {/* <ChatBoxesWrapper 
                tabBarStyle={{height: '36px'}}
                type="editable-card"
                activeKey={activeKey}
                onChange={(key) => {
                    setActiveKey(key);
                    extractChat(key);
                }}
                onEdit={(targetKey, action) => {
                    if (action === 'add') setModalOpen(true);
                    else if (action === 'remove') {
                        setActiveKey(removeChatBox(targetKey, activeKey));
                    }
                }}
                items={chatBoxes}
            />
            <ChatModal 
                open={modalOpen}
                onCreate={({name}) => {
                    setActiveKey(createChatBox(name));
                    extractChat(name);
                    setModalOpen(false);
                }}
                onCancel={() => {
                    setModalOpen(false);
                }}
            /> */}
            <Input
                value={username}
                placeholder="Username"
                style={{ marginBottom: 10 }}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        msgRef.current.focus();
                    }
                }}
            ></Input>
            <Input.Search
                ref={msgRef}
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                enterButton="Send"
                placeholder="Type a message here..."
                onSearch={(msg) => {
                    if (!msg || !username) {
                        displayStatus({
                            type: 'error',
                            msg: 'Please enter a username and a message body.'
                        });
                        return;
                    }
                    sendMessage({ name: username, body: msg });
                    setMsg("");
                    setMsgSent(true);
                }}
            ></Input.Search>

        </>
    )
};

export default ChatRoom;