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

    const [ allNumWOcomplete, setAllNumWOComplete] = useState(0);
    const addAllNumWOComplete = () => setAllNumWOComplete(prev => prev + 1);
    const decAllNumWOComplete = () => setAllNumWOComplete(prev => prev - 1);

    const [ itemArray, setArray ] = useState([]);
    const addItem = (input) => setArray(oldArray => [...oldArray, input]);
    const delItem = (i) => setArray(cur => cur.filter(li => li["B"].key !== i));
    const setATrue = (i) => setArray(oldArray => oldArray[i]["A"] = true);
    // function setAFalse(i) = itemArray.map() => setArray(oldArray => oldArray[i]["A"] = false);
    function setAFalse(index) {
        const nextCounters = itemArray.map((c, i) => {
            // console.log(c)
            if (i === index) {
                return {
                    ...c,
                    A: false
                };
            } else {
                return c;
            }
        });
        setArray(nextCounters);
    }

    const [ idNum, setIdNum ] = useState(0);
    const addNum = () => setIdNum(prev => prev + 1);

    // const [ idArray, setIdArray ] = useState([]);
    // const addIdItem = (input) => setIdArray(oldArray => [...oldArray, input]);
    // const delIdItem = (input) => setIdArray(idArray.filter(key => key !== input));


    function CompleteDetect(e) {
        const changeCSSNode = e.target.parentNode.parentNode.children[1];

        
        // console.log("e.target.id:", e.target.id);
        // console.log("itemArray:", itemArray)
        // console.log("idNum:", idNum);
        const idx = itemArray.findIndex((item) => item["id"] === e.target.id);
        // console.log("idx:", idx);
        if (e.target.checked === true) {
            changeCSSNode.style.textDecoration = "line-through";
            changeCSSNode.style.opacity = "0.5";
            decAllNumber();
            // itemArray[]
            // setAFalse(idx);

        }
        else if (e.target.checked === false) {
            changeCSSNode.style.textDecoration = "none";
            changeCSSNode.style.opacity = "1";
            addAllNumber();
            // setATrue(idx);
        }
        // console.log(itemArray)
        // console.log(itemArray[0]['props'].children[0]['props'].children[0]['props'].id);
    }

    function DeleteDetect(e) {
        // console.log("DeleteDetect", itemArray);
        const self = e.target.parentNode;
        delItem(self.children[0].children[0].id);

        // console.log("DeleteDetect2: ", itemArray);

        if (e.target.parentNode.children[0].children[0].checked === false) {
            decAllNumber();
            decAllNumWOComplete();
            // delIdItem(e.target.parentNode.children[0].children[0].id);
        }
        // console.log(itemArray);
        // delItem(self.children[0].children[0].id);
        // console.log(itemArray);
    }

    function EnterDetect(e) {
        if (e.key === "Enter" && e.target.value !== "") {
            addItem({
                id: idNum,
                A: false,
                B: <li className="todo-app__item" key={idNum} >
                     <div className="todo-app__checkbox">
                        <input type="checkbox" id={idNum} onClick={CompleteDetect} value="n"></input>
                        <label htmlFor={idNum}></label>
                     </div>
                     <h1 className="todo-app__item-detail">{e.target.value}</h1>
                     <img src={X} className="todo-app__item-x" alt="delete" onClick={DeleteDetect}></img>
                </li>
                // idNum
            });
            e.target.value = "";
            // addIdItem(idNum);
            // console.log(idNum);
            addNum();
            // console.log(idNum);
            addAllNumber();
            addAllNumWOComplete();
            // console.log("Enter:", itemArray);
        }
    }

    function ClearDetect() {
        // console.log(itemArray[0]["A"])
        for (let i = 0; i < itemArray.length; i++) {
            // let node = itemArray[];

            // if (node.checked === true) {
            //     node = node.parentNode.parentNode;
            //     node.parentNode.removeChild(node);
            //     decAllNumWOComplete();
            // }
        }
    }

    return (
        <div id="root" className="todo-app__root">
            <button onClick={() => {console.log(itemArray)}}>wew</button>
            <TodoHeader input="todos"/>

            <TodoMain itemArray={itemArray} EnterDetect={EnterDetect} count={allNumber} countWOCom={allNumWOcomplete}/>

            <TodoFooter count={allNumber} ClearDetect={ClearDetect} countWOCom={allNumWOcomplete}/>

        </div>
    );
}

export default App;
