import { TodoFooterLeft } from "../Components/TodoFooterLeft";
import { TodoFooterButton } from "../Components/TodoFooterButton";
import { TodoFooterClean } from "../Components/TodoFooterClean";

const TodoFooter = ({count, itemArray, setArray, countWOCom, setMode}) => {
    function ClearDetect() {
        setArray(cur => cur.filter(item => !item.check));
    }

    if (count === 0 && countWOCom === 0) {
        return
    }
    else {
        return (
            <footer className="todo-app__footer">
                    <TodoFooterLeft input={count}/>
                    
                    <TodoFooterButton setMode={setMode} />
    
                    <TodoFooterClean count={count} ClearDetect={ClearDetect}/>
    
            </footer>
        )
    }
}

export {TodoFooter};