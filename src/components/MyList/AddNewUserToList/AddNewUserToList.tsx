import React, {FC, useState} from 'react';
import {useForm} from "react-hook-form";
import {addUserToList} from "../../../utils/addUserToList";

interface IProps {
    listId:string
}

type IForm = {
    email:string
    role:string
}

const AddNewUserToList: FC<IProps> = ({listId}) => {
    const [isCreatingUser, setIsCreatingUser] = useState<boolean>(false)
    const {register, handleSubmit} = useForm<IForm>();

    const handleAddUserToList = async (data:IForm) =>{
        await addUserToList(listId,data)
    }

    return (
        <div className={'flex flex-col items-center justify-center'}>
            <p>ADD NEW USER</p>
            <svg xmlns="http://www.w3.org/2000/svg"
                 className={`${isCreatingUser && 'rotate-45 transition'} transition`}
                 onClick={() => setIsCreatingUser(prevState => !prevState)}
                 viewBox="0 0 50 50" width="50px" height="50px">
                <path
                    d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 24 13 L 24 24 L 13 24 L 13 26 L 24 26 L 24 37 L 26 37 L 26 26 L 37 26 L 37 24 L 26 24 L 26 13 L 24 13 z"/>
            </svg>
            {isCreatingUser &&
                <form onSubmit={handleSubmit(handleAddUserToList)} className={'bg-emerald-200 px-3 py-2 flex gap-5'}>
                    <div className={'flex gap-5'}>
                        <input
                            className={'h-full'}
                            type="email"
                            {...register('email')}
                            placeholder={'example@gmail'}/>
                        <select
                            className={'h-full'}
                            name="role"
                            {...register('role')}
                            id="role">
                            <option value="viewer">Viewer</option>
                            <option value="admin">Admin</option>
                        </select>
                    </div>
                    <button className={'bg-emerald-600 text-white text-[1.3rem] px-3'}>Add</button>
                </form>
            }
        </div>
    );
};

export {AddNewUserToList};