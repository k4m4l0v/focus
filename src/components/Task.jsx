import { LogoOnly } from "./LogoOnly";
import '../styles/task.css';
import { useContext, useState } from "react";
import { Context } from "..";
import { observer } from "mobx-react-lite";
import { LogoFilled } from "./LogoFilled";
import { Cross } from "./Cross";

export const Task = observer(({title, pomodoroCount, note, id, count}) => {
    const {store} = useContext(Context);

    const [isMouseOverLogo, setIsMouseOverLogo] = useState(false);
    const [isMouseOverCross, setIsMouseOverCross] = useState(false);
    const [isTaskDone, setIsTaskDone] = useState(false);

    return (
        <li 
            className={`task__container ${store.taskId === id ? 'task__container_active' : ''} ${isTaskDone ? 'task__container_done' : ''}`}
            onClick={() => store.setTaskId(id)}
        >
            <header className="task__header">
                <div className="task__title">
                    <span 
                        className="task__logo" 
                        onMouseEnter={() => setIsMouseOverLogo(true)}
                        onMouseLeave={() => setIsMouseOverLogo(false)}
                        onClick={() => setIsTaskDone(!isTaskDone)}
                    >
                        {isMouseOverLogo || isTaskDone ?
                            <LogoFilled width={20} height={20} />
                            :
                            <LogoOnly width={20} height={20} />
                        }
                    </span>
                    <span>{title}</span>
                </div>
                <div className="task__count">
                    <span>{count}/{pomodoroCount}</span>
                    <span
                        onMouseEnter={() => setIsMouseOverCross(true)}
                        onMouseLeave={() => setIsMouseOverCross(false)}
                        onClick={() => store.filterTasks(id)}
                    >
                        {isMouseOverCross ?
                            <Cross fill='#FF2020' />
                            :
                            <Cross fill='#20B2FF' />
                        }
                    </span>
                </div>
            </header>
            {note !== '' ?
                <div className={`task__note_container ${isTaskDone ? 'task__note_done' : ''}`}>
                    {note}
                </div>
                :
                false
            }
        </li>
    )
})
