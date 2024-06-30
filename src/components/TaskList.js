import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import { setTaskEdit, getTasksData, deleteTask } from '../states/todoSlice';

export function TaskList() {
    const tasks = useSelector(getTasksData);
    const dispatch = useDispatch();

    /**
     * @description Method to handle delete of the task
     * @param {Number} id Task ID 
     */
    function handleDelete(id) {
        dispatch(deleteTask(id));
    }

    /**
     * @description Method to handle updation of the task
     * @param {Task} task 
     */
    const handleEditTask = (task) => {
        dispatch(setTaskEdit(task));
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container display="flex" justifyContent="center" sx={{ pt: 3 }} >
                <Grid item xs={12} md={6}>
                    <Typography variant="h4" sx={{ mt: 2, mb: 2 }}>List of Tasks</Typography>
                    <Card sx={{ minWidth: 300 }}>
                        <CardContent>
                            <List>
                                {tasks.map((task, index) => (
                                    <>
                                        <ListItem>
                                            <ListItemText>
                                                {task.taskName}
                                            </ListItemText>
                                            <IconButton 
                                            edge="end" 
                                            aria-label='edit'
                                            onClick={() => handleEditTask(task)}
                                            sx={{mr:1}}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton 
                                            edge="end" 
                                            aria-label='delete'
                                            onClick={() => handleDelete(task.id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </ListItem>
                                        <Divider></Divider>
                                    </>
                                ))}
                            </List>
                            {
                                tasks.length <=0 && 
                                <div>
                                    No Task available. Please add a new task.
                                </div>
                            }  
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}