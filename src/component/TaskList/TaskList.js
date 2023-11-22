// TaskList.js
import React, { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import './TaskList.css';

const TaskList = ({
  tasks,
  onToggleTaskCompletion,
  onDeleteTask,
  onEditTask,
}) => {

  return (
    <Droppable droppableId="TaskList">
      {(provided) => (
      <div ref={provided.innerRef} {...provided.droppableProps}>
      <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
        <colgroup>
              <col style={{ width: '20%' }} />
              <col style={{ width: '40%' }} />
              <col style={{ width: '30%' }} />
              <col style={{ width: '10%' }} />
              <col style={{ width: '5%' }} />
              <col style={{ width: '5%' }} />
            </colgroup>
        <thead>
          <tr>
            <th className="cell">Title</th>
            <th className="cell">Description</th>
            <th className="cell">Due Date</th>
            <th className="cell">Completed</th>
            <th className="cell">Edit</th>
            <th className="cell">Delete</th>
          </tr>
        </thead>
        <tbody
          className="task-list"
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {tasks.map((task, index) => (
            <Draggable key={index} draggableId={`task-${index}`} index={index}>
              {(provided) => (
                <tr
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <td className="cell">{task.title}</td>
                  <td className="cell">{task.description}</td>
                  <td className="cell">{task.dueDate}</td>
                  <td className="cell">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => onToggleTaskCompletion(index)}
                    />
                  </td>
                  <td className="cell">
                      <button onClick={() => onDeleteTask(index)}>Delete</button>
                  </td>
                  <td className="cell">
                      <button onClick={() => onEditTask(index)}>Edit</button>
                  </td>
                </tr>
              )}
            </Draggable>
          ))}
        </tbody>
        </table>
        {provided.placeholder}
        </div>
      )}
   </Droppable>
  );
};

export default TaskList;
