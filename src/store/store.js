import { makeAutoObservable } from "mobx";

export class Store {
    constructor() {
        this._select = 'pomodoro';
        this._time = 25 * 60;
        this._timeLeft = 25 * 60;
        this._count = 0;
        this._taskId = '';
        this._pomodoroCount = 1;
        this._title = '';
        this._isModalOpen = false;
        this._note = '';
        this._taskInfo = {
            title: '',
            pomodoroCount: 1,
            note: '',
            id: '',
            count: 0
        };
        this._tasks = [];
        this._filteredTasks = [];

        makeAutoObservable(this);
    }

    setSelect(select) {
        this._select = select;
    }

    setTime(time) {
        this._time = time;
    }

    setTimeLeft(timeLeft) {
        this._timeLeft = timeLeft;
    }

    setCount(count) {
        this._count = count;
    }

    setTaskId(id) {
        this._taskId = id;
    }

    setPomodoroCount(count) {
        this._pomodoroCount = count;
    }

    setTitle(title) {
        this._title = title;
    }

    setIsModalOpen(bool) {
        this._isModalOpen = bool;
    }

    setTasks(task) {
        this._tasks.push(task);
    }

    filterTasks(id) {
        this._filteredTasks = this._tasks.filter((task) => {
            return task.id !== id
        })

        this._tasks = this._filteredTasks;
    }

    deleteTasks() {
        this._tasks = [];
    }

    setTaskInfo(title, pomodoroCount, note) {
        this._taskInfo = {
            title: title,
            pomodoroCount: pomodoroCount,
            note: note,
            id: new Date(),
            count: 0
        }
    }

    setNote(note) {
        this._note = note;
    }

    get select() {
        return this._select;
    }

    get time() {
        return this._time;
    }

    get timeLeft() {
        return this._timeLeft;
    }

    get count() {
        return this._count;
    }

    get taskId() {
        return this._taskId;
    }

    get pomodoroCount() {
        return this._pomodoroCount;
    }

    get title() {
        return this._title;
    }

    get isModalOpen() {
        return this._isModalOpen;
    }

    get tasks() {
        return this._tasks;
    }
    
    get taskInfo() {
        return this._taskInfo;
    }

    get note() {
        return this._note;
    }
}
