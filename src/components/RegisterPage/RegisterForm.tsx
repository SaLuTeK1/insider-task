import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {createUserWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../config/firebase"
import {saveUserData} from "../../utils/saveUserToDB";

interface IRegistration {
    email: string
    password: string
    re_password: string
    username: string
}

const RegisterForm = () => {
    const {register, handleSubmit, formState: {errors}, watch} = useForm<IRegistration>()
    const [error, setError] = useState('');
    const navigate = useNavigate();


    const handleRegister = async (data: IRegistration) => {
        const {email, password, username} = data
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log("User registered:", user);
            await saveUserData(email,user.uid,username)
            localStorage.setItem('uid', user.uid)
            navigate('/home')

        } catch (error) {
            console.error("Error registering user:", error);
        }
    }

    return (
        <form onSubmit={handleSubmit(handleRegister)}
              className={'bg-[#f8f8f8] rounded flex flex-col gap-[2.5rem] w-1/2 p-5'}>
            <div className={'flex gap-3 '}>
                <label
                    className={'w-full'}
                    htmlFor="email">
                    <h4>Enter your email</h4>
                    <input
                        className={'border rounded py-2 px-2.5 w-full mt-2.5'}
                        id='email' type="email" placeholder={'example@gmail.com'}
                        {...register('email', {required: 'Email is required'})}
                    />
                </label>
                <label
                    className={'w-full'}
                    htmlFor="username">
                    <h4>Enter your username</h4>
                    <input
                        className={'border rounded py-2 px-2.5 w-full mt-2.5'}
                        id='username' type="text" placeholder={'S_A_L_U_T'}
                        {...register('username', {required: 'Username is required'})}
                    />
                </label>
            </div>
            <div className={'flex gap-3'}>
                <label
                    className={'w-full'}
                    htmlFor="password">
                    <h4>Enter your password</h4>
                    <input
                        className={'border rounded py-2 px-2.5 w-full mt-2.5'}
                        id='password' type="password"
                        {...register('password', {required: 'Password is required'})}
                    />
                </label>
                <label
                    className={'w-full'}
                    htmlFor="re_password">
                    <h4>Repeat your password</h4>
                    <input
                        className={'border rounded py-2 px-2.5 w-full mt-2.5'}
                        id='re_password' type="password"
                        {...register('re_password', {
                            validate: (value) => value === watch('password') || 'Passwords do not match'
                        })}
                    />
                    {errors.re_password && <p className="text-red-500">{errors.re_password.message}</p>}
                </label>
            </div>
            <p>Already have an account? <Link className={'text-purple-700'} to={'/login'}>Log-in!</Link></p>
            {error && <p className={'text-red-500'}>{error}</p>}
            <button className={'bg-secondary text-white font-semibold text-[1.5rem] py-2'}>
                Submit
            </button>
        </form>
    );
};

export {RegisterForm};