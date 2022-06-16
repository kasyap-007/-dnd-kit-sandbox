import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const StackItem = ({ item }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };
  return (
    <li
      className="stack-item"
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {item.name}
    </li>
  );
};
export default StackItem;
