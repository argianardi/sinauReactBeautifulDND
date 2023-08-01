import React from 'react';
import { Draggable } from 'react-beautiful-dnd';

function bgcolorChange(props) {
  return props.isDragging
    ? 'lightgreen'
    : props.isDraggable
    ? props.isBacklog
      ? '#F2D7D5'
      : '#DCDCDC'
    : props.isBacklog
    ? '#F2D7D5'
    : '#FFFADA';
}

// handle color task

const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={`${task.id}`} key={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          className={`${
            snapshot.isDragging && 'bg-green-400'
          } rounded-md transition-all duration-1000`}
        >
          <div className="flex items-center justify-between gap-2 px-2 py-6 shadow-md border-[1px] border-gray-200">
            <h3 className="w-4/5 text-xs text-start">
              {task.id}. {task.title}
            </h3>
            <figure className="-mt-6 border-[1px] border-gray-600 w-6 h-6 overflow-hidden rounded-full">
              <img
                className="w-6 h-6"
                src={'https://joesch.moe/api/v1/random?key=' + task.id}
                onClick={() => console.log(task)}
              />
            </figure>
          </div>

          {provided.placeholder}
        </div>
      )}
    </Draggable>
  );
};

export default Task;
