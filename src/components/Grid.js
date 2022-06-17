import React, { useState } from 'react';
import GridItem from './GridItem';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from '@dnd-kit/sortable';

import {
  restrictToFirstScrollableAncestor,
  restrictToWindowEdges,
} from '@dnd-kit/modifiers';

const Grid = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      val: 1,
    },
    {
      id: 2,
      val: 2,
    },
    {
      id: 3,
      val: 3,
    },
    {
      id: 4,
      val: 4,
    },
    {
      id: 5,
      val: 5,
    },
    {
      id: 6,
      val: 6,
    },
    {
      id: 7,
      val: 7,
    },
    {
      id: 8,
      val: 8,
    },
    {
      id: 9,
      val: 9,
    },
    {
      id: 10,
      val: 10,
    },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
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

  return (
    <>
      <h2>Grid</h2>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToFirstScrollableAncestor]}
      >
        <div className="grid-group">
          <SortableContext items={items} strategy={rectSortingStrategy}>
            {items.length > 0 &&
              items.map((item) => {
                return <GridItem key={item.id} item={item} />;
              })}
          </SortableContext>
        </div>
      </DndContext>
    </>
  );
};

export default Grid;
