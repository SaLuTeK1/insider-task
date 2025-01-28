import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getTodoById} from "../utils/getDocById";
import {IList} from "../interfaces/todoInterface";
import {updateTodos} from "../utils/updateLists";

const ListInfoPage = () => {
    const [listInfo, setListInfo] = useState<IList>(null);
    const [todoName, setTodoName] = useState<string | null>(null);
    const [todoDescription, setTodoDescription] = useState<string | null>(null);
    const [listName, setListName] = useState<string | null>(null)

    const [isEditingName, setIsEditingName] = useState<boolean>(false);
    const [isEditingListName, setIsEditingListName] = useState<boolean>(false)
    const [isEditingDescription, setIsEditingDescription] = useState<boolean>(false);

    const q = useParams();
    const {list_id} = q;

    useEffect(() => {
        const fetchData = async () => {
            if (list_id) {
                try {
                    const res = await getTodoById(list_id);
                    console.log(res);
                    setListInfo(res);
                } catch (error) {
                    console.error("Error fetching list info:", error);
                }
            }
        };

        fetchData();
    }, [list_id]);

    if (!listInfo) {
        return (
            <main className={'wrapper py-[4rem]'}>Loading......</main>
        );
    }

    const {list_name, todos} = listInfo;

    // Функція для збереження змін
    const handleSaveChanges = async () => {
        if (listName !== list_name) {
            await updateTodos(list_id, listName);
        }

        // todos.forEach(async (todo) => {
        //     if (todo.todo_name !== todoName || todo.todo_description !== todoDescription) {
        //         await updateTodos(list_id, {
        //             todo_name: todoName ?? todo.todo_name,
        //             todo_description: todoDescription ?? todo.todo_description
        //         });
        //     }
        // });

        setIsEditingName(false);
        setIsEditingListName(false);
        setIsEditingDescription(false);
    };

    return (
        <main className={'wrapper py-[4rem]'}>
            <span className={'flex items-center gap-3'}>
                {
                    isEditingListName ?
                        (<input
                            value={listName ?? list_name}
                            onChange={(e) => setListName(e.target.value)}
                            className={'border p-2'}
                            onBlur={handleSaveChanges}
                            autoFocus
                        />)
                        :
                        (<h1 className={'text-3xl font-medium'}>{listName ?? list_name}</h1>)
                }
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="40px" height="40px" onClick={() => setIsEditingListName(true)}>
                   <path d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z"/>
                </svg>
            </span>
            <section className={'border-2 mt-4 w-full min-h-[400px] p-5 grid grid-cols-4 gap-5'}>
                {todos?.map((todo, index) =>
                    <div key={index} className={'bg-emerald-200 p-8'}>
                        <span className={'flex items-center gap-3'}>
                            {isEditingName ? (
                                <input
                                    value={todoName ?? todo.todo_name}
                                    onChange={(e) => setTodoName(e.target.value)}
                                    className={'border p-2'}
                                    onBlur={handleSaveChanges}
                                    autoFocus
                                />
                            ) : (
                                <>
                                    <h4 className={'text-[2rem] font-medium'}>{todoName ?? todo.todo_name}</h4>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20px" height="20px" onClick={() => setIsEditingName(true)}>
                                        <path d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z"/>
                                    </svg>
                                </>
                            )}
                        </span>

                        {/* Редагування для todo_description */}
                        <span className={'flex'}>
                            {isEditingDescription ? (
                                <textarea
                                    value={todoDescription ?? todo.todo_description}
                                    onChange={(e) => setTodoDescription(e.target.value)}
                                    className={'border p-2'}
                                    onBlur={handleSaveChanges}
                                    autoFocus
                                />
                            ) : (
                                <p className={'text-[1.2rem]'}>{todoDescription ?? todo.todo_description}</p>
                            )}
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="20px" height="20px" onClick={() => setIsEditingDescription(true)}>
                                <path d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z"/>
                            </svg>
                        </span>
                    </div>
                )}
            </section>
        </main>
    );
};

export {ListInfoPage};
