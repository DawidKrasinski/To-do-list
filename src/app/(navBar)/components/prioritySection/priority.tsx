import { PriorityButton } from "@/app/components/priority/priority-button";
import { Priority } from "@/app/priorityType";
import { useToDoList } from "@/app/toDoListProvider";
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
} from "@dnd-kit/core";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import { SortableContext } from "@dnd-kit/sortable";
import { useState } from "react";

interface PriorityProps {
  priority: Priority;
  onChange: (priorityID: number) => void;
  onDrop: (newPriorityIndex: number, oldPriorityIndex: number) => void;
}

export function PrioritySection({ onChange, onDrop, priority }: PriorityProps) {
  const { priorityList } = useToDoList();
  const [draggedPriorityId, setDraggedPriorityId] = useState<number | null>(
    null
  );

  function handleDragEnd(event: DragEndEvent) {
    console.log("event", event);
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = priorityList.findIndex(
        (priority) => priority.order === active.id
      );
      const newIndex = priorityList.findIndex(
        (priority) => priority.order === over?.id
      );
      console.log("Old Index:", oldIndex);
      console.log("New Index:", newIndex);
    }
  }

  function handleDragStart(event: DragEndEvent) {
    const { active } = event;
    setDraggedPriorityId(parseInt(active.id.toString()));
  }

  return (
    <section className="text-xl flex flex-col gap-2">
      <div className="flex gap-2">
        <DndContext
          onDragEnd={(event) => handleDragEnd(event)}
          collisionDetection={closestCorners}
          modifiers={[restrictToParentElement, restrictToVerticalAxis]}
        >
          <SortableContext items={priorityList.map((priority) => priority.id)}>
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
          <DragOverlay>
            {draggedPriorityId ? (
              <PriorityButton
                priority={
                  priorityList.find(
                    (priority) => priority.id === draggedPriorityId
                  )!
                }
                isActive={priority.id === draggedPriorityId}
                onChange={onChange}
                isDraggable={true}
              />
            ) : null}{" "}
          </DragOverlay>
        </DndContext>
      </div>
    </section>
  );
}
