import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../config/firebase";
import { IList, IListResponse } from "../../src/interfaces/todoInterface";
type user = {
    role:string
    email:string
}
export const getTodosForUser = async (uid: string, email: string): Promise<IListResponse> => {
    try {
        // Запит для пошуку по UID
        const qByUid = query(
            collection(db, "todos")
        );
        const snapshotByUid = await getDocs(qByUid);

        // Фільтруємо документи, де email є в масиві users
        const todos: IList[] = [];
        snapshotByUid.docs.forEach(doc => {
            const data = doc.data();
            const users:user[] = data.users || [];
            const userExists = users.some(user => user.email === email);
            const selfList = data.uid === uid
            if (userExists || selfList) {
                todos.push({
                    id: doc.id,
                    list_name: data.list_name,
                    todos: data.todos
                } as IList);
            }
        });

        if (todos.length === 0) {
            console.log("No lists found for user with uid or email:", uid, email);
            return [];
        } else {
            console.log("Todos for user:", todos);
            return todos;
        }
    } catch (error) {
        console.error("Error getting todos:", error);
        return [];
    }
};
