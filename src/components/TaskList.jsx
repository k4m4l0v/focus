import { Task } from "./Task";
import '../styles/task-list.css';
import { AddTask } from "./AddTask";
import { observer } from "mobx-react-lite";
import { useContext } from "react";
import { Context } from "..";
import { TaskModal } from "./TaskModal";

export const TaskList = observer(() => {
    const {store} = useContext(Context);

    return (
        <section className="task-list">
            <header className="task-list__header">
                <span>
                    TASKS
                </span>
                <button 
                    className="task-list__header_button"
                    onClick={() => store.deleteTasks()}
                >
                    DELETE ALL TASKS
                </button>
            </header>
            <hr />
            <ul className="task-list__list">
                {store.tasks.map(task =>
                    <Task title={task.title} pomodoroCount={task.pomodoroCount} note={task.note} id={task.id} count={task.count} key={task.id} />
                )}
            </ul>
            {store.isModalOpen ?
                <TaskModal />
                :
                <AddTask />
            }
        </section>
    )
})
