import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";

export const createTodo = async (
    uid: string,
    list_name: string,
    todos: { todo_name: string; todo_description: string }[]
) => {
    try {
        const todosWithIds = todos.map(todo => ({
            id: crypto.randomUUID(),
            ...todo,
        }));

        const docRef = await addDoc(collection(db, "todos"), {
            uid,
            list_name,
            todos: todosWithIds,
        });

        console.log("Todo list created with ID:", docRef.id);
    } catch (error) {
        console.error("Error creating todo list:", error);
    }
};
