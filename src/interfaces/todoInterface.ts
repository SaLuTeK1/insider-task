import { DocumentData } from "firebase/firestore"; // Якщо використовуєте Firestore

export interface IList {
    id:string
    list_name: string;
    todos: IToDo[];
}

export interface IToDo{
    todo_name: string;
    todo_description: string;
}

// Тип для відповіді, якщо це масив
export type IListResponse = IList[];

// Якщо використовуєте Firestore, можете розширити тип:
export interface IFirestoreList extends DocumentData, IList {
    id: string; // Додаткове поле для ID документа
}
