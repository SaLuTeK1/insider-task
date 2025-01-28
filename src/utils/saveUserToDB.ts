import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const saveUserData = async (userId: string, email: string,username:string) => {
    try {
        const userRef = doc(db, "users", userId);
        await setDoc(userRef, {
            email,
            createdAt: new Date(),
            username,
        });
        console.log("User data saved to Firestore");
    } catch (error) {
        console.error("Error saving user data:", error);
    }
}