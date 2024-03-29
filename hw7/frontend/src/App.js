import {useEffect} from 'react';
import {useChat} from './containers/hooks/useChat';
import styled from 'styled-components';
import SignIn from './containers/SignIn';
import ChatRoom from './containers/ChatRoom';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 500px;
    margin: auto;
`;

const App = () => {
    const {status, signedIn, displayStatus} = useChat();
    useEffect(() => {
        displayStatus(status);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    return (
        <Wrapper>{signedIn ? <ChatRoom /> : <SignIn />}</Wrapper>
    );
}

export default App
