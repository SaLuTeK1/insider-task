import { DocumentData } from "firebase/firestore"; // Якщо використовуєте Firestore

export interface IList {
    id:string
    uid:string
    list_name: string;
    todos: IToDo[];
    users:{
        role:string
        email:string
    }[]
}

export interface IToDo{
    id?:string
    todo_name: string;
    todo_description: string;
    done?:boolean
}

// Тип для відповіді, якщо це масив
export type IListResponse = IList[];

// Якщо використовуєте Firestore, можете розширити тип:
export interface IFirestoreList extends DocumentData, IList {
    id: string; // Додаткове поле для ID документа
}
