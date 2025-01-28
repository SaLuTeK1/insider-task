import React, {useEffect, useState} from 'react';
import {getTodosForUser} from "../utils/getTodosForUser";
import {CustomDialog} from "../components/CustomCreateTODOdialog/CustomDiaglog";
import {IList, IToDo} from "../interfaces/todoInterface";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import {deleteTodoById} from "../utils/deleteDoc";
import {listAction} from "../store/slices/listSlice";
import {useNavigate} from "react-router-dom";

const MyListPage = () => {
    const [uid, setUid] = useState<string>(null)
    const [todos, setTodos] = useState<IList[]>([]);
    const [isCreating, setIsCreating] = useState<boolean>(false)
    const navigate = useNavigate();
    const {trigger} = useAppSelector(state => state.list);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setUid(localStorage.getItem('uid'))
        if (uid) {
            getTodosForUser(uid).then(setTodos)
        }
    }, [uid, trigger]);

     const deleteList = async (id:string) =>{
         await deleteTodoById(id)
         dispatch(listAction.setTrigger(true))
     }

    return (
        <main className={'wrapper py-[4rem]'}>
            {todos?.length === 0 ?
                <div className={'flex items-center justify-between'}>
                    <h2 className={'text-2xl'}>Your list is empty</h2>
                    <CustomDialog uid={uid} isOpen={isCreating} setIsCreating={setIsCreating}>
                        <div className={'flex flex-col items-center justify-center'}>
                            <p className={'text-[1.125rem]'}>Create One</p>
                            <svg onClick={() => setIsCreating(true)} xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 50 50" width="50px" height="50px">
                                <path
                                    d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"/>
                            </svg>
                        </div>
                    </CustomDialog>
                </div>
                :
                <>
                    <CustomDialog uid={uid} isOpen={isCreating} setIsCreating={setIsCreating}>
                        <div className={'flex justify-end mb-6'}>
                            <div className={'flex flex-col items-center'}>
                                <p className={'text-[1.125rem]'}>Create One</p>
                                <svg onClick={() => setIsCreating(true)} xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 50 50" width="50px" height="50px">
                                    <path
                                        d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"/>
                                </svg>
                            </div>
                        </div>
                    </CustomDialog>
                    {todos.map(todo =>
                        <div key={todo?.id}
                             className={'flex justify-between items-center bg-green-100 rounded px-4 py-5 mb-5'}>
                            <h2 className={'font-semibold text-2xl'}>{todo?.list_name}</h2>
                            <div className={'flex gap-4'}>
                                {todo?.todos.map((item: IToDo, index: number) => <p key={index}>{item?.todo_name}</p>)}
                            </div>
                            <div className={'flex gap-5'}>
                                <button
                                    onClick={()=>navigate(`${todo?.id}`)}
                                    className={'font-medium text-[1rem] text-blue-200 bg-blue-800 px-3.5 py-1.5 rounded'}>
                                    Edit
                                </button>
                                <button
                                    onClick={()=>deleteList(todo?.id)}
                                    className={'font-medium text-[1rem] text-red-200 bg-red-800 px-3.5 py-1.5 rounded'}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    )}
                </>
            }
        </main>
    );
};

export {MyListPage};