import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";

import { addTaskdata, getEditTask, isAddOrEditTask, saveEditTask, setAddOrEditTask } from "../states/todoSlice";

const defaultFormData = {
    id: '',
    taskName: '',
};

export function TaskInput() {
    // use of selector to read the state of redux store
    const isEditOrAddTaskOpen = useSelector(isAddOrEditTask);
    const task = useSelector(getEditTask)

    const [formData, setFormData] = useState(defaultFormData);

    // to dispatch the action
    const dispatch = useDispatch();

    /**
     * @description Method to handle the closing action of dialog box
     */
    const handleClose = () => {
        dispatch(setAddOrEditTask(false));
    }

    /**
     * @description Method to add a new task to the list
     * @param {*} 
     */
    const handleAddTask = (e) => {
        dispatch(addTaskdata(formData));
        setFormData(defaultFormData);
    }

    /**
     * @description Method to add the updated task
     * @param {*} 
     */
    const handleSaveTask = () => {
        dispatch(saveEditTask(formData));
        setFormData(defaultFormData);
    }
//Updates state with the new value for a given control
    function handleValueChange(ctrlName, ctrlValue, e) {
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [ctrlName]: ctrlValue
            }
        })
    }

    useEffect(() => {
        // if Task is available for edit then set the task in the form else set form as empty with default value
        if (task) {
            setFormData({
                id: task.id,
                taskName: task.taskName
            });
        } else {
            setFormData(defaultFormData);
        }
    }, [task]);

    return (
        <>
            <Dialog
                open={isEditOrAddTaskOpen}
                onClose={handleClose}
            >
                <DialogTitle>
                    {
                        !task && 'Add New Task'
                    }
                    {
                        !!task && `Edit Task ${task.id}`
                    }
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        required
                        style={{ width: '20rem' }}
                        value={formData.taskName}
                        placeholder="Enter the task"
                        onChange={(e) => handleValueChange('taskName', e.target.value, e)}
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    {
                        !task && <Button onClick={handleAddTask} color="primary" variant="contained" >Add task</Button>
                    }
                    {
                        !!task && <Button onClick={handleSaveTask} color="primary" variant="contained" >Save task</Button>
                    }
                </DialogActions>
            </Dialog>
        </>
    )
}