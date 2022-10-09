import X from "../x.png"

const TodoMainItem = () => {
    return (
        <ul className="todo-app__list" id="todo-list">
            <li className="todo-app__item">
                <div className="todo-app__checkbox">
                    <input type="checkbox" id="0"></input>
                    <label htmlFor="0"></label>
                </div>
                <h1 className="todo-app__item-detail">First</h1>
                <img src={X} className="todo-app__item-x" alt="delete"></img>
            </li>

            <li className="todo-app__item">
                <div className="todo-app__checkbox">
                    <input type="checkbox" id="1"></input>
                    <label htmlFor="1"></label>
                </div>
                <h1 className="todo-app__item-detail">This is the second TODO</h1>
                <img src={X} className="todo-app__item-x" alt="delete"></img>
            </li>

            <li className="todo-app__item">
                <div className="todo-app__checkbox">
                    <input type="checkbox" id="2"></input>
                    <label htmlFor="2"></label>
                </div>
                <h1 className="todo-app__item-detail">This is the third TODO</h1>
                <img src={X} className="todo-app__item-x" alt="delete"></img>
            </li>
        </ul>
    )
}

export {TodoMainItem};