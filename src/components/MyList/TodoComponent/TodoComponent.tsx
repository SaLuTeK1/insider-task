import React, {useState} from 'react';
import {IToDo} from "../../../interfaces/todoInterface";
import {updateTodoDoneStatus, updateTodos} from "../../../utils/updateLists";
import {removeTodo} from "../../../utils/deleteTodo";
import {useAppDispatch} from "../../../hooks/reduxHooks";
import {listAction} from "../../../store/slices/listSlice";

type TodosProps = {
    todos: IToDo[];
    listId: string
    isAdmin: boolean
};

const TodoList: React.FC<TodosProps> = ({todos, listId, isAdmin}) => {
        const dispatch = useAppDispatch();
        const [editingTodoId, setEditingTodoId] = useState<string | null>(null);
        const [editedTodos, setEditedTodos] = useState<{
            [key: string]: { todo_name: string; todo_description: string }
        }>({});

        const startEditing = (todoId: string, todo_name: string, todo_description: string) => {
            setEditingTodoId(todoId);
            setEditedTodos((prev) => ({
                ...prev,
                [todoId]: {todo_name, todo_description}
            }));
        };

        const handleEditChange = (todoId: string, field: 'todo_name' | 'todo_description', value: string) => {
            setEditedTodos((prev) => ({
                ...prev,
                [todoId]: {...prev[todoId], [field]: value}
            }));
        };

        const saveChanges = async (todoId: string) => {
            const updatedTodo = editedTodos[todoId];
            if (!updatedTodo) return;

            // Оновлюємо локальний масив todos (без зміни інших елементів)
            const updatedTodos = todos.map(todo =>
                todo.id === todoId ? {...todo, ...updatedTodo} : todo
            );
            // Оновлюємо Firebase
            await updateTodos(listId, undefined, updatedTodos);
            dispatch(listAction.setTrigger(true))
            setEditingTodoId(null);
        };

        const deleteTodo = async (id: string) => {
            const todoToRemove = todos.find(todo => todo.id === id);
            if (todoToRemove) {
                await removeTodo(listId, todoToRemove);
                dispatch(listAction.setTrigger(true))
            }
        }

        const markAsDone = async (id: string) => {
            await updateTodoDoneStatus(listId, id, true)
            dispatch(listAction.setTrigger(true))
        }

        const markAsNotDone = async (id: string) => {
            await updateTodoDoneStatus(listId, id, false)
            dispatch(listAction.setTrigger(true))
        }

        return (
            <section className='border-2 mt-4 w-full min-h-[400px] p-5 grid grid-cols-4 gap-5'>
                {todos.map((todo) => (
                        <div key={todo.id}
                             className={`${todo?.done ? 'bg-blue-100' : 'bg-emerald-200'} p-8 flex flex-col justify-between relative`}>
                            {todo?.done
                                ?
                                <button onClick={() => markAsNotDone(todo.id)}
                                        className={'absolute top-4 cursor-pointer text-2xl right-4'}>Done</button>
                                :
                                <button onClick={() => markAsDone(todo.id)}
                                        className={'absolute top-4 cursor-pointer  text-2xl right-4'}>Did?</button>
                            }
                            <span className='flex items-center gap-3'>

                        {editingTodoId === todo.id ? (
                            <input
                                value={editedTodos[todo.id]?.todo_name || todo.todo_name}
                                onChange={(e) => handleEditChange(todo.id, 'todo_name', e.target.value)}
                                className='border p-2'
                                autoFocus
                            />
                        ) : (
                            <h4 className='text-[2rem] font-medium'>{todo.todo_name}</h4>
                        )}
                                {isAdmin &&
                                    <button
                                        onClick={() => startEditing(todo.id, todo.todo_name, todo.todo_description)}>🖊</button>
                                }
                    </span>

                            <span className='flex'>
                        {editingTodoId === todo.id ? (
                            <textarea
                                value={editedTodos[todo.id]?.todo_description || todo.todo_description}
                                onChange={(e) => handleEditChange(todo.id, 'todo_description', e.target.value)}
                                className='border p-2'
                            />
                        ) : (
                            <p className='text-[1.2rem]'>{todo.todo_description}</p>
                        )}
                                {isAdmin &&
                                    <button
                                        onClick={() => startEditing(todo.id, todo.todo_name, todo.todo_description)}>✍</button>
                                }
                    </span>

                            {editingTodoId === todo.id && (
                                <button onClick={() => saveChanges(todo.id)}>Save</button>
                            )}
                            {isAdmin &&
                                <button className={'bg-red-600 text-white text-2xl px-3 py-2'}
                                        onClick={() => deleteTodo(todo.id)}>Delete</button>
                            }
                        </div>
                    )
                )
                }
            </section>
        )
            ;
    }
;

export {TodoList};
