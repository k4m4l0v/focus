import { observer } from "mobx-react-lite";
import { useContext, useState } from "react";
import { Context } from '..';
import '../styles/task-modal.css';
import { ArrowUp } from "./ArrowUp";
import { ArrowDown } from "./ArrowDown";

export const TaskModal = observer(() => {
    const {store} = useContext(Context);
    const [isNote, setIsNote] = useState(false);

    const clickUp = () => {
        if (store.pomodoroCount < 50) {
            store.setPomodoroCount(store.pomodoroCount + 1)
        }
    }

    const clickDown = () => {
        if (store.pomodoroCount > 1) {
            store.setPomodoroCount(store.pomodoroCount - 1)
        }
    }

    const closeClick = () => {
        store.setPomodoroCount(1);
        setIsNote(false);
        store.setTitle('');
        store.setIsModalOpen(false);
        store.setNote('');
    }

    const saveClick = () => {
        store.setTaskInfo(store.title, store.pomodoroCount, store.note)
        store.setTasks(store.taskInfo);
        store.setPomodoroCount(1);
        setIsNote(false);
        store.setTitle('');
        store.setNote('');
    }

    return (
        <div className="modal__container">
            <input 
                className="modal__input-title"
                placeholder="What are you working on?"
                type="text"
                value={store.title}
                onChange={e => store.setTitle(e.target.value)}
            />
            <div className="modal__input-pomodoros_container">
                <span>POMODOROS</span>
                <div className="modal__input-pomodoros_wrapper">
                    <input 
                        className="modal__input-pomodoros"
                        type="number"
                        min={1}
                        max={50}
                        value={store.pomodoroCount}
                        onChange={e => store.setPomodoroCount(e.target.value)}
                    />
                    <button
                        className="modal__input-pomodoros_button animation"
                        onClick={clickUp}
                    >
                        <ArrowUp />
                    </button>
                    <button
                        className="modal__input-pomodoros_button animation"
                        onClick={clickDown}
                    >
                        <ArrowDown />
                    </button>
                </div>
            </div>
            <button
                className="modal__add-note_button"
                onClick={() => setIsNote(true)}
            >
                + ADD NOTE
            </button>
            {isNote ?
                <input 
                    className="modal__add-note_input"
                    type="text"
                    placeholder="Some notes"
                    value={store.note}
                    onChange={e => store.setNote(e.target.value)}
                />
                :
                false
            }
            <div className="modal__footer">
                <div className="modal__footer_buttons-wrapper">
                    <button 
                        className="modal__close-button"
                        onClick={closeClick}
                    >
                        CLOSE
                    </button>
                    <button 
                        className="modal__save-button"
                        onClick={saveClick}
                        disabled={store.title === ''}
                    >
                        SAVE
                    </button>
                </div>
            </div>
        </div>
    )
})
