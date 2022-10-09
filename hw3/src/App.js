import './style.css';
import { useState } from 'react'
import { TodoHeader } from './Containers/TodoHeader';
import { TodoMain } from './Containers/TodoMain';
import { TodoFooter } from './Containers/TodoFooter';
import X from "./x.png"

function App() {
    const [ allNumber, setAllNumber] = useState(0);
    const addAllNumber = () => setAllNumber(prev => prev + 1);
    const decAllNumber = () => setAllNumber(prev => prev - 1);

    // const [ allNumWOcomplete, setAllNumWOComplete] = useState(0);
    // const addAllNumWOComplete = () => setAllNumWOComplete(prev => prev + 1);
    // const decAllNumWOComplete = () => setAllNumWOComplete(prev => prev - 1);

    const [ itemArray, setArray ] = useState([]);
    const addItem = (input) => setArray(oldArray => [...oldArray, input]);
    // const delItem = (input) => setArray([...itemArray.slice(0, input), ...itemArray.slice(input+1)]);
    const delItem = (input) => setArray(current => current.filter(index => {return index['props'].children[0]['props'].children[0]['props'].id !== input}));

    const [ idNum, setIdNum ] = useState(0);
    const addNum = () => setIdNum(prev => prev + 1);

    // const [ idArray, setIdArray ] = useState([]);
    // const addIdItem = (input) => setIdArray(oldArray => [...oldArray, input]);
    // const delIdItem = (input) => setIdArray(idArray.filter(key => key !== input));


    function CompleteDetect(e) {
        const changeCSSNode = e.target.parentNode.parentNode.children[1];
        if (e.target.checked === true) {
            changeCSSNode.style.textDecoration = "line-through";
            changeCSSNode.style.opacity = "0.5";
            decAllNumber();
        }
        else if (e.target.checked === false) {
            changeCSSNode.style.textDecoration = "none";
            changeCSSNode.style.opacity = "1";
            addAllNumber();
        }
        // console.log(itemArray[0]['props'].children[0]['props'].children[0]['props'].id);
    }

    function DeleteDetect(e) {
        console.log(itemArray);
        const self = e.target.parentNode;
        if (Number(self.children[0].children[0].id) === Number(itemArray.length)) {
            self.parentNode.removeChild(self);
        }
        else {
            delItem(self.children[0].children[0].id);
        }
        console.log(itemArray);

        if (e.target.parentNode.children[0].children[0].checked === false) {
            decAllNumber();
            // decAllNumWOComplete();
            // delIdItem(e.target.parentNode.children[0].children[0].id);
        }
        // console.log(itemArray);
        // delItem(self.children[0].children[0].id);
        // console.log(itemArray);
    }

    function EnterDetect(e) {
        if (e.key === "Enter" && e.target.value !== "") {
            addItem(
                <li className="todo-app__item">
                     <div className="todo-app__checkbox">
                        <input type="checkbox" id={idNum} onClick={CompleteDetect} value="n"></input>
                        <label htmlFor={idNum}></label>
                     </div>
                     <h1 className="todo-app__item-detail">{e.target.value}</h1>
                     <img src={X} className="todo-app__item-x" alt="delete" onClick={DeleteDetect}></img>
                </li>
            );
            e.target.value = "";
            // addIdItem(idNum);
            addNum();
            addAllNumber();
            // addAllNumWOComplete();
        }
    }

    function ClearDetect() {
        // for (let i = 0; i < allNumWOcomplete; i++) {
        //     let node = document.getElementById(i);
        //     if (node.checked === true) {
        //         node = node.parentNode.parentNode;
        //         node.parentNode.removeChild(node);
        //         decAllNumWOComplete();
        //     }
        // }
    }

    return (
        <div id="root" className="todo-app__root">
            <TodoHeader input="todos"/>

            <TodoMain itemArray={itemArray} EnterDetect={EnterDetect} count={allNumber}/>

            <TodoFooter count={allNumber} ClearDetect={ClearDetect}/>

        </div>
    );
}

export default App;
