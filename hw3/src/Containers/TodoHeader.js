const TodoHeader = ({input}) => {
    return (
        <header className="todo-app__header">
            <h1 className="todo-app__title">{input}</h1>
        </header>
    )
}
export {TodoHeader};