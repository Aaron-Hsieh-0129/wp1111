import { createContext, useContext, useState } from 'react';

const ADD_MESSAGE_COLOR = '#3d84b8';
const REGULAR_MESSAGE_COLOR = '#2b2e4a';
const ERROR_MESSAGE_COLOR = '#fb3640';

const ScoreCardContext = createContext({
  messages: [],
  rowTable: [],
  queryTable: [],

  addCardMessage: () => {},
  addRegularMessage: () => {},
  addErrorMessage: () => {},
  deleteRegularMessage: () => {},
  setRowTable: () => {},
  setQueryTable: () => {}
});

const makeMessage = (message, color, tag) => {
  return { message, color, tag };
};

const ScoreCardProvider = (props) => {
  const [messages, setMessages] = useState([]);
  const [rowTable, setRowTable] = useState([]);
  const [queryTable, setQueryTable] = useState([]);

  const addCardMessage = (message, tag) => {
    setMessages([...messages, makeMessage(message, ADD_MESSAGE_COLOR, tag)]);
  };

  const addRegularMessage = (...ms) => {
    setMessages([
      ...messages,
      ...ms.map((m) => makeMessage(m, REGULAR_MESSAGE_COLOR, "query")),
    ]);
  };

  const addErrorMessage = (message, tag) => {
    setMessages([...messages, makeMessage(message, ERROR_MESSAGE_COLOR, tag)]);
  };

  const deleteRegularMessage = () => {
    const error = [];
    // for (let m of messages) {
    //   if (m.color === ERROR_MESSAGE_COLOR) {
    //     error.push(m);
    //   }
    // }
    error.push(makeMessage('Database cleared', REGULAR_MESSAGE_COLOR, "all"));
    setMessages(cur => cur = error);
    setQueryTable(cur => cur = []);
    setRowTable(cur => cur = []);
  }

  return (
    <ScoreCardContext.Provider
      value={{
        messages,
        rowTable,
        queryTable,
        addCardMessage,
        addRegularMessage,
        addErrorMessage,
        deleteRegularMessage,
        setRowTable,
        setQueryTable
      }}
      {...props}
    />
  );
};

function useScoreCard() {
  return useContext(ScoreCardContext);
}

export { ScoreCardProvider, useScoreCard };
