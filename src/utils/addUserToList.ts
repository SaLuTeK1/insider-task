import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const addUserToList = async (listId: string, user: { email: string, role: string }) => {
    try {
        const listRef = doc(db, "todos", listId);

        // Додаємо користувача до масиву users
        await updateDoc(listRef, {
            users: arrayUnion(user),  // arrayUnion дозволяє додавати нові елементи в масив
        });

        console.log("User added successfully!");
    } catch (error) {
        console.error("Error adding user:", error);
    }
};
