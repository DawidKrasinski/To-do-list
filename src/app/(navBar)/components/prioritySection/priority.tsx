import { PriorityButton } from "@/app/components/priority/priority-button";
import { Priority } from "@/app/priorityType";
import { useToDoList } from "@/app/toDoListProvider";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

interface PriorityProps {
  priority: Priority;
  onChange: (priorityID: number) => void
  onDrop: (PriorityOrder: number) => void
}

export function PrioritySection({ onChange, onDrop, priority}: PriorityProps) {
  const { priorityList } = useToDoList();

  function handleDragEnd(event: DragEndEvent){
    const {active, over} = event

    if(active.id !== over?.id){
        const newIndex = priorityList.findIndex((priority) => priority.order === over?.id)


        onDrop(newIndex)
    }
  }

  return (
    <section className="text-xl flex flex-col gap-2">
      <div className="flex gap-2">
      <DndContext onDragEnd={handleDragEnd}>
        <SortableContext items={priorityList.map((priority) => priority.id)}>
            {priorityList.map((priorityElement) =>  (
        <PriorityButton
          key={priorityElement.id}
          priority={priorityElement}
          isActive={priority.id === priorityElement.id}
          onChange={onChange} 
        />
      ))}
        </SortableContext>
      </DndContext>
      </div>
    </section>
  );
}
