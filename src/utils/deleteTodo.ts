import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import {db} from "../config/firebase"
const removeTodo = async (listId: string, todoToRemove: { todo_name: string, todo_description: string }) => {
    try {
        const listRef = doc(db, "todos", listId);

        await updateDoc(listRef, {
            todos: arrayRemove(todoToRemove),
        });

        console.log("Todo removed successfully!");
    } catch (error) {
        console.error("Error removing todo:", error);
    }
};
