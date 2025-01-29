import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {getTodoById} from "../utils/getDocById";
import {IList} from "../interfaces/todoInterface";
import {updateTodos} from "../utils/updateLists";
import {AddTodoDialog} from "../components/CustomCreateTODOdialog/AddTodoDialog";
import {useAppSelector} from "../hooks/reduxHooks";
import {TodoList} from "../components/MyList/TodoComponent/TodoComponent";
import {AddNewUserToList} from "../components/MyList/AddNewUserToList/AddNewUserToList";

const ListInfoPage = () => {
    const [listInfo, setListInfo] = useState<IList>(null);
    const [listName, setListName] = useState<string | null>(null)
    const [email, setEmail] = useState<string>(null)
    const [uidS, setUidS] = useState<string>(null)
    const [isCreating, setIsCreating] = useState<boolean>(false)
    const [isEditingListName, setIsEditingListName] = useState<boolean>(false)

    const {trigger} = useAppSelector(state => state.list);

    const q = useParams();
    const {list_id} = q;

    useEffect(() => {
        setEmail(localStorage.getItem('email' || null))
        setUidS(localStorage.getItem('uid' || null))
        const fetchData = async () => {
            if (list_id) {
                try {
                    const res = await getTodoById(list_id);
                    setListInfo(res);
                } catch (error) {
                    console.error("Error fetching list info:", error);
                }
            }
        };

        fetchData();
    }, [list_id, trigger]);

    if (!listInfo) {
        return (
            <main className={'wrapper py-[4rem]'}>Loading......</main>
        );
    }

    const {list_name, todos, users, uid} = listInfo;

    const isAdmin = users.some(user => user.email === email && user.role === 'admin') || uid === uidS;

    const handleSaveChanges = async () => {
        if (listName !== list_name) {
            await updateTodos(list_id, listName);
        }
        setIsEditingListName(false);
    };

    return (
        <main className={'wrapper py-[4rem]'}>
            <div className={'flex items-center justify-between'}>
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
                {isAdmin &&
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50" width="40px" height="40px"
                         onClick={() => setIsEditingListName(true)}>
                        <path
                            d="M 43.125 2 C 41.878906 2 40.636719 2.488281 39.6875 3.4375 L 38.875 4.25 L 45.75 11.125 C 45.746094 11.128906 46.5625 10.3125 46.5625 10.3125 C 48.464844 8.410156 48.460938 5.335938 46.5625 3.4375 C 45.609375 2.488281 44.371094 2 43.125 2 Z M 37.34375 6.03125 C 37.117188 6.0625 36.90625 6.175781 36.75 6.34375 L 4.3125 38.8125 C 4.183594 38.929688 4.085938 39.082031 4.03125 39.25 L 2.03125 46.75 C 1.941406 47.09375 2.042969 47.457031 2.292969 47.707031 C 2.542969 47.957031 2.90625 48.058594 3.25 47.96875 L 10.75 45.96875 C 10.917969 45.914063 11.070313 45.816406 11.1875 45.6875 L 43.65625 13.25 C 44.054688 12.863281 44.058594 12.226563 43.671875 11.828125 C 43.285156 11.429688 42.648438 11.425781 42.25 11.8125 L 9.96875 44.09375 L 5.90625 40.03125 L 38.1875 7.75 C 38.488281 7.460938 38.578125 7.011719 38.410156 6.628906 C 38.242188 6.246094 37.855469 6.007813 37.4375 6.03125 C 37.40625 6.03125 37.375 6.03125 37.34375 6.03125 Z"/>
                    </svg>
                }
                    </span>
                {isAdmin &&
                    <div className={'flex items-center gap-5'}>
                        <div className={'flex flex-col justify-center items-center'}>
                            <p>
                                ADD NEW TASK
                            </p>
                            <AddTodoDialog listId={list_id} isOpen={isCreating} setIsCreating={setIsCreating}>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     onClick={() => setIsCreating(true)}
                                     viewBox="0 0 50 50" width="50px" height="50px">
                                    <path
                                        d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"/>
                                </svg>
                            </AddTodoDialog>
                        </div>
                        <AddNewUserToList listId={list_id}/>
                    </div>
                }
            </div>

            <TodoList todos={todos} listId={list_id} isAdmin={isAdmin}/>

        </main>
    )
        ;
};

export {ListInfoPage};
