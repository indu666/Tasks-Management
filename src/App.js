import { useDispatch, useSelector } from 'react-redux';
import './App.css';

import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import AppBar from '@mui/material/AppBar';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

import { TaskList } from './components/TaskList';
import { TaskInput } from './components/TaskInput';

import { setAddOrEditTask } from './states/todoSlice';

function App() {
  const dispatch = useDispatch();

  const handleAddTask = () => {
    dispatch(setAddOrEditTask(true));
  }

  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <Typography variant='h5'>
            Tasks Management
          </Typography>
          <Button
            color="inherit"
            variant="outlined" 
            sx={{ position: 'absolute', right: 10}} 
            onClick={handleAddTask}
            startIcon={<AddCircleOutlineOutlinedIcon />}
            >
              Add Task
          </Button>
        </Toolbar>
      </AppBar>
      <TaskList />
      <TaskInput />
    </div>
  );
}

export default App;
