const TodoFooterClean = ({count, ClearDetect}) => {
    if (count === 0) {
        return;
    }
    else {
        return (
            <div className="todo-app__clean">
                <button className="button" onClick={ClearDetect}>Clear completed</button>
            </div>
        );
    }
    
}

export {TodoFooterClean};