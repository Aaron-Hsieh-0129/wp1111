const TodoMain = ({itemArray, EnterDetect, count, countWOCom}) => {
    // console.log("TodoApp:", itemArray);
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
                    {itemArray.map(i => i["B"])}
                </ul>
            </section>
        )
    }

    
}

export {TodoMain};