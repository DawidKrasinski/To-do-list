"use client"
import { PrioritySection } from "@/app/components/priority/priority-component";
import { Priority } from "@/app/priorityType";
import { useState } from "react";
import { UserPhoto } from "../components/user/userPhoto";
import { useToDoList } from "@/app/toDoListProvider";

export default function addPriority () {
    const [activePriority, setActivePriority] = useState<Priority>({id: 0, color: "#ffffff", name: "", order: 0})
    const {priorityList, addPriority} = useToDoList()

    function handleActivePriorityChange(priorityId: number) {
        const priority = priorityList.find((priority) => priority.id === priorityId)
        if(priority) setActivePriority({...priority})
    }

    function handlePriorityNameChange(priorityName: string) {
        setActivePriority((priority) => ({ ...priority, name: priorityName }))
    }

    function handlePriorityColorChange(priorityColor: string) {
        setActivePriority((priority) => ({ ...priority, color: priorityColor }))
    }

    function handleAddPriorityButtonClicked(priority: Priority) {
        if(priority.color && priority.name?.trim()){
            console.log(priority)
            addPriority(priority)
        } else {
            console.log("Priority is invalid")
        }
        
    }

    return (
        <div className="px-4 pt-16 text-lg flex flex-col flex-col gap-8">
            <div className="flex gap-16 items-center">
                <h1 className="text-2xl">Hi *Name*, you are in priority section</h1>
                <UserPhoto/>
            </div>
            <PrioritySection onChange={handleActivePriorityChange} priority={activePriority}/>
            <div className="flex flex-col gap-4">   
                <h2 className="text-xl">Create new priority</h2>
                    <div className="flex gap-2">
                        <input placeholder="name" value={activePriority.name} type="text" onChange={(e) => handlePriorityNameChange(e.target.value)} className="bg-muted rounded-lg p-3"/>
                        <input type="color" value={activePriority.color} onChange={(e) => handlePriorityColorChange(e.target.value)} className="bg-muted rounded-lg p-3"/>
                    </div>
            </div>
            <button
            onClick={() => handleAddPriorityButtonClicked(activePriority)}
            className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg p-3 w-full"
          >
            Create Priority
          </button>
        </div>
    )
}