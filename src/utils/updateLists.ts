import { doc, updateDoc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import {IToDo} from "@/src/interfaces/todoInterface"; // замініть на ваш файл конфігурації

export const updateTodos = async (listId: string, newListName?:string, updatedTodos?: IToDo[]) => {
    try {

        const listRef = doc(db, "todos", listId);

        const updateData: { list_name?: string, todos?: IToDo[] } = {};

        if (newListName) {
            updateData.list_name = newListName;
        }

        if (updatedTodos) {
            updateData.todos = updatedTodos;
        }
        await updateDoc(listRef, updateData);

        console.log("Todos updated successfully!");
    } catch (error) {
        console.error("Error updating todos:", error);
    }
};

export const updateTodoDoneStatus = async (listId: string, todoId: string, done: boolean) => {
    try {
        const listRef = doc(db, "todos", listId);
        const listSnapshot = await getDoc(listRef);

        if (!listSnapshot.exists()) {
            console.log("List not found");
            return;
        }

        const listData = listSnapshot.data();

        if (!listData || !listData.todos) {
            console.log("No todos found in the list");
            return;
        }

        const updatedTodos = listData.todos.map((todo: IToDo) =>
            todo.id === todoId ? { ...todo, done } : todo
        );

        await updateDoc(listRef, {
            todos: updatedTodos
        });

        console.log("Todo updated successfully!");
    } catch (error) {
        console.error("Error updating todo:", error);
    }
};

