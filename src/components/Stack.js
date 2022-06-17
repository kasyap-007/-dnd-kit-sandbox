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
import {
  restrictToFirstScrollableAncestor,
  restrictToVerticalAxis,
} from '@dnd-kit/modifiers';

import StackItem from './StackItem';

const Stack = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Chrome' },
    { id: 2, name: 'Edge' },
    { id: 3, name: 'Brave' },
    { id: 4, name: 'Firefox' },
    { id: 5, name: 'Opera' },
    { id: 6, name: 'Sigma OS' },
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
    <>
      <h2>List (Vertical - Scrollable)</h2>
      <DndContext
        modifiers={[restrictToFirstScrollableAncestor, restrictToVerticalAxis]}
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
    </>
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
