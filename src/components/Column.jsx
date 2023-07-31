import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import Task from './Task';

const Column = ({ title, tasks, id }) => {
  return (
    <div className="column w-80 h-[475px] bg-[#f4f5f7] rounded-sm border-[1px] border-gray-400">
      <h3 className="sticky top-0 p-2 text-center bg-[#add8e6]">{title}</h3>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            className="p-1 min-h-[100px]"
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) => (
              <Task key={index} index={index} task={task} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
