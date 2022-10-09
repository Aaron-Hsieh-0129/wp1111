const TodoMain = ({itemArray, EnterDetect}) => {

    // if (count === 0) {
    //     return (
    //         <section className="todo-app__main">
    //             <input className="todo-app__input" placeholder="What need to be done?" onKeyPress={EnterDetect}></input>
    //         </section>
    //     )
    // }
    // else {
        return (
            <section className="todo-app__main">
                <input className="todo-app__input" placeholder="What need to be done?" onKeyPress={EnterDetect}></input>
                <ul className="todo-app__list" id="todo-list">
                    {itemArray}
                </ul>
            </section>
        )
    // }

    
}

export {TodoMain};