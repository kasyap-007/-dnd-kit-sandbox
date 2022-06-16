import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';

import StackItem from './StackItem';

const Stack = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'rishi' },
    { id: 2, name: 'Kasyap' },
    { id: 3, name: 'harry' },
    { id: 4, name: 'Potter' },
    { id: 5, name: 'john wick' },
  ]);

  // If the draggable item needs to fire a click event adding activationConstraints can be used - delay/distance
  const sensors = [
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
  ];

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <ul className="stack-group">
        <SortableContext items={items} strategy={verticalListSortingStrategy}>
          {items.map((item) => (
            <StackItem key={item.id} item={item} />
          ))}
        </SortableContext>
      </ul>
    </DndContext>
  );

  function handleDragEnd(event) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }
};

export default Stack;
