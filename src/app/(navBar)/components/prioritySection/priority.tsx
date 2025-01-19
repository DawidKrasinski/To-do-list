import { PriorityButton } from "@/app/components/priority/priority-button";
import { Priority } from "@/app/types/priorityType";
import { useToDoList } from "@/app/toDoListProvider";
import { closestCorners, DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  horizontalListSortingStrategy,
  SortableContext,
} from "@dnd-kit/sortable";

interface PriorityProps {
  priority: Priority;
  onChange: (priorityID: number) => void;
  onDrop: (newPriorityIndex: number, oldPriorityIndex: number) => void;
}

export function PrioritySection({ onChange, priority }: PriorityProps) {
  const { priorityList } = useToDoList();

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    console.log("active:", active, "over:", over);
  }

  return (
    <section className="text-xl flex flex-col gap-2">
      <div className="flex gap-2 flex-wrap">
        <DndContext
          collisionDetection={closestCorners}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            // strategy={horizontalListSortingStrategy}
            items={priorityList.map((priority) => priority.id)}
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
        </DndContext>
      </div>
    </section>
  );
}
