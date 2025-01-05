"use client"
import { PrioritySection } from "@/app/components/priority/priority-component";
import { Priority } from "@/app/priorityType";
import { useState } from "react";
import { UserPhoto } from "../components/user/userPhoto";
import { useToDoList } from "@/app/toDoListProvider";

export default function addPriority () {
    const [activePriority, setActivePriority] = useState<Priority>({id: 0, color: "#ffffff", name: "", order: 0})
    const {priorityList, taskList, addPriority, editPriority, deletePriority} = useToDoList()
    const isEditing = priorityList.find((priority) => priority.id === activePriority.id)

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

    function handleEditPriorityButtonClicked(priority: Priority) {
        if(priority.color && priority.name?.trim()){
            console.log(priority)
            editPriority(priority)
        } else {
            console.log("Priority is invalid")
        }
    }

    function handleDeletePriorityButtonClicked(id: number){ 
        if(!taskList.some((task) => task.priority.id === id))
        deletePriority(id)
    }

    return (
        <div className="px-4 pt-16 text-lg flex flex-col flex-col gap-8">
            <div className="flex gap-16 items-center">
                <h1 className="text-2xl">Hi *Name*, you are in priority section</h1>
                <UserPhoto/>
            </div>
            <PrioritySection onChange={handleActivePriorityChange} priority={activePriority}/>
            <div className="flex flex-col gap-4">   
                <h2 className="text-xl">{isEditing ? "You are editing priority" : "Create new priority"}</h2>
                    <div className="flex gap-2">
                        <input placeholder="name" value={activePriority.name} type="text" onChange={(e) => handlePriorityNameChange(e.target.value)} className="bg-muted rounded-lg p-3"/>
                        <input type="color" value={activePriority.color} onChange={(e) => handlePriorityColorChange(e.target.value)} className="bg-muted rounded-lg p-3"/>
                    </div>
            </div>
            <div className="flex gap-6">
                <button
            onClick={() => isEditing ? handleEditPriorityButtonClicked(activePriority) : handleAddPriorityButtonClicked(activePriority)}
            className="bg-gradient-to-r from-purple-400 to-pink-400 rounded-lg p-3 w-full"
          >
            {isEditing ? "Edit Priority" : "Create Priority"}
          </button>
          {isEditing ? <button
            onClick={() => handleDeletePriorityButtonClicked(activePriority.id)}
            className="bg-deleteButton rounded-lg p-3 w-full"
          >Delete Priority</button> : ""}
          </div>
        </div>
    )
}