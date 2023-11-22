// TodoApp.js
import React, { useState, useEffect } from 'react';
import TodoForm from './component/TodoForm/TodoForm';
import TaskList from './component/TaskList/TaskList';
import Modal from 'react-modal';
import { DragDropContext } from 'react-beautiful-dnd';
import './App.css';

Modal.setAppElement('#root');
const TODO_APP_STORAGE_KEY = 'TODO_APP';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [showForm, setShowForm] = useState(false);
  const [editedTask, setEditedTask] = useState(null);
  const [editIdx, setEditIdx] = useState(-1);
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(TODO_APP_STORAGE_KEY)) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    if (tasks.length > 0) localStorage.setItem(TODO_APP_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const createTask = () => {
    setEditedTask(null);
    setEditIdx(-1);
    setShowForm(true);
  };

  const addTask = (newTask) => {
    setTasks([...tasks, { ...newTask, completed: false }]);
    setShowForm(false);
  };

  const editTask = (index) => {
    setEditedTask(tasks[index]);
    setEditIdx(index);
    setShowForm(true);
  };

  const commitTask = (editedTask, editIdx) => {
    if (editIdx !== -1) {
      const updatedTasks = [...tasks];
      const index = editIdx;
      updatedTasks[index] = editedTask;
      setTasks(updatedTasks);
      setEditedTask(null);
      
    } else {
      addTask(editedTask);
    }
    editIdx = -1;
    setShowForm(false);
  };

  const cancelForm = () => {
    setEditedTask(null);
    setShowForm(false);
  };

  const toggleTaskCompletion = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  const onDragEnd = (result, monitor) => {
    if (!result.destination) {
      return;
    }
    const { destination, source } = result;
    // Check if a valid drag operation is active
    if (destination && destination.index !== source.index) {
      // Perform actions related to the drag
      // ...
      const updatedTasks = [...tasks];
      const [movedTask] = updatedTasks.splice(result.source.index, 1);
      updatedTasks.splice(result.destination.index, 0, movedTask);

      setTasks(updatedTasks);
      // Stop the drag operation
      //monitor.stop();
    }
    
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    return filter === 'completed' ? task.completed : !task.completed;
  });


  return (
    <div>
      <h1>Todo List</h1>
      <button className="add-button" onClick={() =>  createTask()}>Add</button>
      <Modal
        isOpen={showForm}
        onRequestClose={() => cancelForm()}
        contentLabel="Todo Form"
      >
        <TodoForm
        isOpen={showForm}
        onRequestClose={() => cancelForm()}
          onCommit={commitTask}
          editedTask={editedTask}
          editIdx = {editIdx}
        />
      </Modal>
      <div>
        <label>
          Filter:
          <select onChange={(e) => setFilter(e.target.value)} value={filter}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
        </label>
      </div>
        <DragDropContext onDragEnd={onDragEnd}>
        <TaskList
                tasks={filteredTasks}
                onToggleTaskCompletion={toggleTaskCompletion}
                onDeleteTask={deleteTask}
                onEditTask={editTask}
              />
      </DragDropContext>
    </div>
  );
};

export default App;