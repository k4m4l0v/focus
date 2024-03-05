import { Plus } from "./Plus";
import '../styles/add-task.css';
import { useContext } from "react";
import { Context } from "..";
import { observer } from "mobx-react-lite";

export const AddTask = observer(() => {
    const {store} = useContext(Context);

    return (
        <div 
            className="add-task__container"
            onClick={() => store.setIsModalOpen(true)}
        >
            <Plus />
            <span>Add task</span>
        </div>
    )
})
