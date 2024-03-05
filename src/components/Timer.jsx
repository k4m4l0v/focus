import { useState, useEffect, useContext } from 'react';
import '../styles/timer.css';
import { getTimePad } from '../helpers/getTimePad';
import { Context } from '..';
import { observer } from 'mobx-react-lite';

export const Timer = observer(() => {
    const {store} = useContext(Context);

    const [isCounting, setIsCounting] = useState(false);
    const minutes = getTimePad(Math.floor(store.timeLeft / 60));
    const seconds = getTimePad(store.timeLeft - Number(minutes)  * 60);

    useEffect(() => {
        const interval = setInterval(() => {
            isCounting &&
            store.setTimeLeft(store.timeLeft >= 1 ? store.timeLeft - 1 : 0)
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [isCounting])

    useEffect(() => {
        if (store.timeLeft === 0) {
            handleSkip();
        }
    }, [store.timeLeft])

    const handleStart = () => {
        setIsCounting(true);
    }

    const handleStop = () => {
        setIsCounting(false);
    }

    const handleSkip = () => {
        setIsCounting(false);
        store.select === 'pomodoro' ? 
        setShortBreak() 
        : 
        setPomodoro();

        if (store.select !== 'pomodoro') {
            store.tasks.map(task => {
                if (task.id === store.taskId) {
                    task.count++
                }
            })
            store.setCount(store.count + 1);
        }
    }

    const setPomodoro = () => {
        store.setTimeLeft(25 * 60);
        store.setSelect('pomodoro');
        setIsCounting(false);
    }

    const setShortBreak = () => {
        store.setTimeLeft(5 * 60);
        store.setSelect('short break');
        setIsCounting(false);
    }

    const setLongBreak = () => {
        store.setTimeLeft(15 * 60);
        store.setSelect('long break');
        setIsCounting(false);
    }

    return (
        <section className="timer">
            <header className="timer__header">
                <ul className='timer__header_nav'>
                    <li 
                        className={`timer__header_item ${store.select === 'pomodoro' ? 'timer__header_item_active' : ''}`}
                        onClick={setPomodoro}
                    >
                        POMODORO
                    </li>
                    <li 
                        className={`timer__header_item ${store.select === 'short break' ? 'timer__header_item_active' : ''}`}
                        onClick={setShortBreak}
                    >
                        SHORT BREAK
                    </li>
                    <li 
                        className={`timer__header_item ${store.select === 'long break' ? 'timer__header_item_active' : ''}`}
                        onClick={setLongBreak}
                    >
                        LONG BREAK
                    </li>
                </ul>
            </header>
            <div className="timer__time">
                {minutes}:{seconds}
            </div>
            {isCounting ?
                <>
                    <button 
                        className="timer__start-button"
                        onClick={handleStop}
                    >
                        STOP
                    </button>
                    <button
                        className='timer__skip-button'
                        onClick={handleSkip}
                    >
                        SKIP
                    </button>
                </>
                :
                <button 
                    className="timer__start-button"
                    onClick={handleStart}
                >
                    START
                </button>
            }
        </section>
    )
})
