import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const getTodoById = async (id: string): Promise<any> => {
    try {
        const docRef = doc(db, "todos", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            console.log("Document data:", { id: docSnap.id, ...data });
            return { id: docSnap.id, ...data };
        } else {
            console.log("No such document!");
            return null;
        }
    } catch (error) {
        console.error("Error getting document:", error);
        throw error;
    }
};
