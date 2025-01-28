import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const deleteTodoById = async (id: string): Promise<void> => {
    try {
        const docRef = doc(db, "todos", id);
        await deleteDoc(docRef);
        console.log(`Document with ID ${id} has been deleted`);
    } catch (error) {
        console.error("Error deleting document:", error);
    }
};
