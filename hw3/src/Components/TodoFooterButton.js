const TodoFooterButton = ({setMode}) => {
    return (
        <ul className="todo-app__view-buttons">
            <button className="button" onClick={() => { setMode("All") }}>All</button>
            <button className="button" onClick={() => { setMode("Active") }}>Active</button>
            <button className="button" onClick={() => { setMode("Completed") }}>Completed</button>
        </ul>
    )    
}

export {TodoFooterButton};