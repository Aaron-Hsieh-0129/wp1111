import { TodoFooterLeft } from "../Components/TodoFooterLeft";
import { TodoFooterButton } from "../Components/TodoFooterButton";
import { TodoFooterClean } from "../Components/TodoFooterClean";

const TodoFooter = ({count, ClearDetect}) => {
    if (count === 0) {
        return
    }
    else {
        return (
            <footer className="todo-app__footer">
                    <TodoFooterLeft input={count}/>
                    
                    <TodoFooterButton />
    
                    <TodoFooterClean count={count} ClearDetect={ClearDetect}/>
    
            </footer>
        )
    }
}

export {TodoFooter};