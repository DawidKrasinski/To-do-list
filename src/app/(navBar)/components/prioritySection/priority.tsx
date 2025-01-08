import { PriorityButton } from "@/app/components/priority/priority-button";
import { Priority } from "@/app/priorityType";
import { useToDoList } from "@/app/toDoListProvider";
import { DragEndEvent } from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";
import { useState } from "react";

interface PriorityProps {
  priority: Priority;
  onChange: (priorityID: number) => void;
  onDrop: (newPriorityIndex: number, oldPriorityIndex: number) => void;
}

export function PrioritySection({ onChange, onDrop, priority }: PriorityProps) {
  const { priorityList } = useToDoList();

  return (
    <section className="text-xl flex flex-col gap-2">
      <div className="flex gap-2">
        <SortableContext
          items={priorityList}
          strategy={horizontalListSortingStrategy}
        >
          {priorityList.map((priorityElement) => (
            <PriorityButton
              key={priorityElement.id}
              priority={priorityElement}
              isActive={priority.id === priorityElement.id}
              onChange={onChange}
              isDraggable={true}
            />
          ))}
        </SortableContext>
      </div>
    </section>
  );
}
