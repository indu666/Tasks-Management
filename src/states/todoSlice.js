import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
    name: "tasks",
    initialState: {
        isloading: false,
        tasks: [],
        isError: null,
        editTask: null,
        isAddOrEditTask: false,
    },
    reducers: {
        //Adds a new task with a unique ID
        addTaskdata(state, action) {
            const task = action.payload;
            state.tasks.push({
                ...task,
                id: new Date().getTime()
            });
            state.isAddOrEditTask = false;
        },

        // Saves edited task
        saveEditTask(state, action) {
            const task = action.payload;
            state.tasks = state.tasks.map(item => {
                if (item.id === task.id) {
                    return task;
                }

                return item;
            });
            state.editTask = null;
            state.isAddOrEditTask = false;
        },

        // Deletes a task by its id
        deleteTask(state, action) {
            const newtasks = state.tasks.filter((task) => task.id !== action.payload);
            state.tasks = newtasks;
        },

        // Sets the state to edit a specific task
        setTaskEdit(state, action) {
            state.isAddOrEditTask = true;
            state.editTask = action.payload;
        },

        // Toggles the add/edit form visibility
        setAddOrEditTask(state, action) {
            const payload = action.payload;
            state.isAddOrEditTask = payload;
            state.editTask = null;
        }
    },
    selectors: {
        // Retrieves the list of tasks
        getTasksData: (state) => {
            return state.tasks;
        },

         // Retrieves the task currently being edited
        getEditTask: (state) => {
            return state.editTask;
        },

        // Checks if the add/edit task form is visible
        isAddOrEditTask: (state) => {
            return state.isAddOrEditTask;
        }
    }
});

export const { addTaskdata, deleteTask, setTaskEdit, saveEditTask, setAddOrEditTask } = todoSlice.actions;
export const { getTasksData, getEditTask, isAddOrEditTask } = todoSlice.selectors;
export default todoSlice.reducer;
