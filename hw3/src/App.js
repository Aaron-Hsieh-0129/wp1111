import './style.css';
import { useState } from 'react'
import { TodoHeader } from './Containers/TodoHeader';
import { TodoMain } from './Containers/TodoMain';
import { TodoFooter } from './Containers/TodoFooter';

function App() {
    const [ allNumber, setAllNumber] = useState(0);

    const [ allNumWOcomplete, setAllNumWOComplete] = useState(0);

    const [ itemArray, setArray ] = useState([]);

    const [ itemMode, setMode ] = useState("All");


    return (
        <div id="root" className="todo-app__root">
            <TodoHeader input="todos" />

            <TodoMain itemArray={itemArray} setArray={setArray} count={allNumber} setAllNumber={setAllNumber} countWOCom={allNumWOcomplete} setAllNumWOComplete={setAllNumWOComplete} itemMode={itemMode} />

            <TodoFooter count={allNumber} itemArray={itemArray} setArray={setArray} countWOCom={allNumWOcomplete} setMode={setMode} />

        </div>
    );
}

export default App;
