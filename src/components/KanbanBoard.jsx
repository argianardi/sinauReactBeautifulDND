import React, { useEffect, useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Column from './Column';

const KanbanBoard = () => {
  const [completed, setCompleted] = useState([]);
  const [inCompleted, setInCompleted] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((json) => {
        setCompleted(json.filter((task) => task.completed));
        setInCompleted(json.filter((task) => !task.completed));
      });
  }, []);

  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (source.droppableId == destination.droppableId) return;

    // Remove From Source Array
    if (source.droppableId == 2) {
      setCompleted(removeItemById(draggableId, completed));
    } else {
      setInCompleted(removeItemById(draggableId, inCompleted));
    }

    // Get Item
    const task = findItemById(draggableId, [...inCompleted, ...completed]);

    // Add Item
    if (destination.droppableId == 2) {
      setCompleted([{ ...task, completed: !task.completed }, ...completed]);
    } else {
      setInCompleted([{ ...task, completed: !task.completed }, ...inCompleted]);
    }
  };

  function findItemById(id, array) {
    return array.find((item) => item.id == id);
  }

  function removeItemById(id, array) {
    return array.filter((item) => item.id != id);
  }

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <h2 className="my-3 text-center">PROGRESS BOARDS</h2>
      <div className="flex justify-center gap-8">
        <Column title={'To do'} tasks={inCompleted} id={'1'} />
        <Column title={'Done'} tasks={completed} id={'2'} />
        <Column title={'BackLog'} tasks={[]} id={'3'} />
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
