import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const addTodo = async (
    listId: string,
    newTodo: { todo_name: string; todo_description: string }
) => {
    try {
        const listRef = doc(db, "todos", listId);

        const todoWithId = {
            id: crypto.randomUUID(),
            ...newTodo,
        };

        await updateDoc(listRef, {
            todos: arrayUnion(todoWithId),
        });

        console.log("Todo added successfully!", todoWithId);
        return todoWithId;
    } catch (error) {
        console.error("Error adding todo:", error);
    }
};
