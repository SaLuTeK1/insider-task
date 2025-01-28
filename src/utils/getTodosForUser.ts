import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../config/firebase";
import {IList, IListResponse} from "../../src/interfaces/todoInterface";

export const getTodosForUser = async (uid: string):Promise<IListResponse> => {
    try {
        const q = query(collection(db, "todos"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
            return [];
        } else {
            const todos: IList[] = querySnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id:doc.id,
                    list_name: data.list_name,
                    todos: data.todos
                } as IList;
            });
            console.log("Todos for user:", todos);
            return todos;
        }
    } catch (error) {
        console.error("Error getting todos:", error);
    }
}