import React, {FC, PropsWithChildren} from 'react';
import {useForm} from "react-hook-form";
import {addTodo} from "../../utils/addToDo";
import {useAppDispatch} from "../../hooks/reduxHooks";
import {listAction} from "../../store/slices/listSlice";

interface IAddTODO {
    todo_name: string;
    todo_description: string;
}

interface IProps extends PropsWithChildren {
    isOpen: boolean;
    setIsCreating: React.Dispatch<React.SetStateAction<boolean>>;
    listId: string
}

const AddTodoDialog: FC<IProps> = ({children, isOpen, setIsCreating, listId}) => {
    const {handleSubmit, register, control} = useForm<IAddTODO>({
        defaultValues: {
            todo_name: '', todo_description: ''
        },
    });

    const dispatch = useAppDispatch();

    const handleCreate = async (data: IAddTODO) => {
        await addTodo(listId,data);
        dispatch(listAction.setTrigger(true))
        setIsCreating(false)
    };

    return (
        <div>
            <div>
                {children}
            </div>
            <div
                // onClick={() => setIsCreating(false)}
                className={`${!isOpen && 'hidden'} grid place-content-center bg-[#00000032] z-20 fixed left-0 top-0 w-full h-full`}
            >
                <form
                    onSubmit={handleSubmit(handleCreate)}
                    className={'bg-emerald-200 w-[500px] p-4 flex flex-col items-end gap-5'}
                >
                    <svg
                        className={'rotate-45'}
                        // onClick={() => setIsCreating(false)}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 50 50" width="20px" height="20px"
                    >
                        <path
                            d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"
                        />
                    </svg>
                    <div className={'bg-emerald-300 rounded p-3 w-full'}>
                        <label htmlFor={`todo_name`}>
                            <h3 className={'font-medium text-[1.4rem]'}>TODO name</h3>
                            <input
                                {...register(`todo_name`, {required: true})}
                                id={`todo_name`}
                                className={'border rounded py-2 px-2.5 w-full mt-2.5'}
                                type="text"
                                placeholder={'Auchan'}
                            />
                        </label>
                        <label htmlFor={`todo_description`}>
                            <h3 className={'font-medium text-[1.4rem]'}>TODO description</h3>
                            <textarea
                                {...register(`todo_description`, {required: true})}
                                id={`todo_description`}
                                className={'border rounded py-2 px-2.5 w-full mt-2.5'}
                                placeholder={'Buy sweets'}
                            />
                        </label>
                    </div>
                    <button
                        type="submit"
                        className={'mt-2 bg-blue-500 text-white px-4 py-2 rounded'}
                    >
                        Create
                    </button>
                </form>
            </div>
        </div>
    );
};

export {AddTodoDialog};