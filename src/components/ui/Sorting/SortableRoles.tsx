import React, { useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

interface DraggableListProps {
  roles: string[];
  onRolesChange: (newRoles: string[]) => void;
}

const DraggableList: React.FC<DraggableListProps> = ({ roles, onRolesChange }) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const onDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const onDrop = (index: number) => {
    if (draggedIndex !== null && draggedIndex !== index && draggedIndex !== 0 && index !== 0) {
      const reorderedRoles = [...roles];
      const [movedRole] = reorderedRoles.splice(draggedIndex, 1);
      reorderedRoles.splice(index, 0, movedRole);
      onRolesChange(reorderedRoles);
    }
    setDraggedIndex(null);
  };

  const onSelect = (index: number) => {
    setSelectedIndex(selectedIndex === index ? null : index);
  };

  return (
    <>
      {roles.map((role, index) => (
        <div
          key={index}
          draggable={index !== 0}
          onDragStart={() => index !== 0 && onDragStart(index)}
          onDragOver={(event) => index !== 0 && onDragOver(event)}
          onDrop={() => onDrop(index)}
          onClick={() => index !== 0 && onSelect(index)}
          className={`flex items-center justify-between text-left font-semibold text-sm p-3 transition-colors duration-200 cursor-pointer ${
            index === 0
              ? "bg-forest-500 text-accent-50"
              : selectedIndex === index
              ? "bg-accent-150 border-l-4 border-forest-500"
              : "hover:bg-accent-100 hover:border-forest-500 border-l-4 border-transparent"
          } group`}
        >
          <span className="flex-grow">{role}</span>
          {index !== 0 && (
            <div
              className={`flex gap-2 ${
                selectedIndex === index
                  ? "opacity-100"
                  : "opacity-0 group-hover:opacity-100"
              } transition-opacity duration-200`}
            >
              <button className="text-accent-500 hover:text-forest-500">
                <EditIcon />
              </button>
              <button className="text-accent-500 hover:text-rose-600">
                <DeleteIcon />
              </button>
            </div>
          )}
        </div>
      ))}
    </>
  );
};

export default DraggableList;
