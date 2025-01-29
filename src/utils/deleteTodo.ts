import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import {db} from "../config/firebase"
import {IToDo} from "@/src/interfaces/todoInterface";
export const removeTodo = async (listId: string, todo: IToDo) => {
    try {
        const listRef = doc(db, "todos", listId);
        await updateDoc(listRef, {
            todos: arrayRemove(todo),
        });

        console.log("Todo removed successfully!");
    } catch (error) {
        console.error("Error removing todo:", error);
    }
};
