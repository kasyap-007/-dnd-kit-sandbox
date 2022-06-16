import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

const StackItem = ({ id }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id });

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
      {id}
    </li>
  );
};
export default StackItem;
