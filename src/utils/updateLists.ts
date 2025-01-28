import { doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase"; // замініть на ваш файл конфігурації

export const updateTodos = async (listId: string,newListName?:string, updatedTodos?: { todo_name: string, todo_description: string }[]) => {
    try {

        const listRef = doc(db, "todos", listId);

        await updateDoc(listRef, {
            list_name:newListName,
            // todos: updatedTodos,
        });

        console.log("Todos updated successfully!");
    } catch (error) {
        console.error("Error updating todos:", error);
    }
};
