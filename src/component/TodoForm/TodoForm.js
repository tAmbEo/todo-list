// TodoForm.js
import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import './TodoForm.css';

const TodoForm = ({ isOpen, onRequestClose, onCommit,  editedTask , editIdx }) => {
  const [task, setTask] = useState({ title: '', description: '' , dueDate: ''});
  const [errors, setErrors] = useState({});
  
  useEffect(() => {
    if (editedTask) {
      setTask(editedTask);
    }
  }, [editedTask]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask((prevTask) => ({ ...prevTask, [name]: value }));
  };

  const handleDateChange = (date) => {
    setTask((prevTask) => ({ ...prevTask, dueDate: date }));
  };


  const handleCommit = (e) => {
    e.preventDefault();
    if (validateForm()) {
        onCommit(task, editIdx);
        setTask({ title: '', description: '' , dueDate: ''});
        onRequestClose();
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!task.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!task.description.trim()) {
      newErrors.description = 'Description is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (

      isOpen && (
      <div className="form-modal">
        <form onSubmit={handleCommit}>
        <h2 className="form-title">Todo Task</h2>
          <table className="form-table">
            <tbody>
              <tr>
                <td className = "caption" >Title:</td>
                <td className = "input">
                <input
                  type="text"
                  name="title"
                  value={task.title}
                  onChange={handleInputChange}
                />
                {errors.title && <div className="error">{errors.title}</div>}
                </td>
              </tr>
              <tr>
                <td className = "caption">Description:</td>
                <td className = "input">
                <input
                  type="text"
                  name="description"
                  value={task.description}
                  onChange={handleInputChange}
                />
                  {errors.description && <div className="error">{errors.description}</div>}
                </td>
              </tr>
              <tr>
                <td className = "caption">Due Date:</td>
                <td className = "input">
                  <input type="date" 
                  name="dueDate"
                  value={task.dueDate || ''} 
                  onChange={handleInputChange}/>
                </td>
              </tr>
              <tr>
                <td className = "btn">
                  <button className="commit-button" type="submit">
                    Commit
                  </button>
                </td>
                <td className = "btn">
                  <button className="cancel-button" onClick={onRequestClose}>
                    Cancel
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
      </form>
      </div> )

  );
};

export default TodoForm;
