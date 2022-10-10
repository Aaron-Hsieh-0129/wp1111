import { useState } from 'react';
import X from "../x.png";

const TodoMain = ({itemArray, setArray, count, setAllNumber, countWOCom, setAllNumWOComplete, itemMode}) => {
    const [ idNum, setIdNum ] = useState(0);
    const addNum = () => setIdNum(prev => prev + 1);
    const addAllNumber = () => setAllNumber(prev => prev + 1);
    const decAllNumber = () => setAllNumber(prev => prev - 1);
    const addAllNumWOComplete = () => setAllNumWOComplete(prev => prev + 1);
    const decAllNumWOComplete = () => setAllNumWOComplete(prev => prev - 1);
    const addItem = (input) => setArray(cur => [...cur, input]);
    const delItem = (i) => setArray(cur => cur.filter(li => li.id !== i));
    const noLineClass = "todo-app__item-detail noLine";
    const lineClass = "todo-app__item-detail line";
    function CompleteDetect(e) {

        const thisItem = itemArray.find((item) => item.id === Number(e.target.id));

        if (!thisItem.check) {
            decAllNumber();
        }
        else {
            addAllNumber();
        }
        setArray(cur => cur.map(item => {
            if (item.id === thisItem.id) {
                return {
                    ...thisItem,
                    check: !thisItem.check
                }
            }
            else {
                return item;
            }
        }));
    }

    function DeleteDetect(e) {
        delItem(Number(e.target.id));
        const thisItem = itemArray.find((item) => item.id === Number(e.target.id));

        if (!thisItem.check) {
            decAllNumber();
            decAllNumWOComplete();
        }
    }

    function EnterDetect(e) {
        if (e.key === "Enter" && e.target.value !== "") {
            addItem({
                id: idNum,
                check: false,
                todoItem: e.target.value
            });
            e.target.value = "";
            addNum();
            addAllNumber();
            addAllNumWOComplete();
        }
    }

    
    if (count === 0 && countWOCom === 0) {
        return (
            <section className="todo-app__main">
                <input className="todo-app__input" placeholder="What need to be done?" onKeyPress={EnterDetect}></input>
            </section>
        )
    }
    else {
    
        return (
            <section className="todo-app__main">
                <input className="todo-app__input" placeholder="What need to be done?" onKeyPress={EnterDetect}></input>
                <ul className="todo-app__list" id="todo-list">
                    {itemArray.filter(item => (itemMode === "All") || (itemMode === "Active" && !item.check) || (itemMode === "Completed" && item.check))
                    .map(item => (
                        <li className="todo-app__item" key={item.id} >
                            <div className="todo-app__checkbox">
                                <input type="checkbox" id={item.id} onChange={CompleteDetect} checked={item.check}></input>
                                <label htmlFor={item.id}></label>
                            </div>
                            <h1 className={item.check ? lineClass : noLineClass}>{item.todoItem}</h1>
                            <img src={X} className="todo-app__item-x" alt="delete" onClick={DeleteDetect} id={item.id}></img>
                        </li> 
                    ))}
                </ul>
            </section>
        )
    }

    
}

export {TodoMain};