import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {auth, signInWithEmailAndPassword} from '../../../config/firebase';
import {Link, useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../../hooks/reduxHooks";
import {listAction} from "../../../store/slices/listSlice";

interface ILogIn {
    email: string
    password: string
}

const LogInForm = () => {

    const {register, handleSubmit} = useForm<ILogIn>()
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLogin = async (data: ILogIn) => {
        const {email, password} = data
        try {
            const res = await signInWithEmailAndPassword(auth, email, password);
            localStorage.setItem('uid', res.user.uid)
            localStorage.setItem('email',email)
            dispatch(listAction.setLogin())
            navigate('/home'); // Перенаправлення після успішного логіну
        } catch (error) {
            setError('Incorrect email or password');
        }
    };


    return (
        <form onSubmit={handleSubmit(handleLogin)}
              className={'bg-[#f8f8f8] rounded flex flex-col gap-[2.5rem] w-1/2 p-5'}>
            <label htmlFor="email">
                <h4>Enter your email</h4>
                <input
                    className={'border rounded py-2 px-2.5 w-full mt-2.5'}
                    id='email' type="email" placeholder={'example@gmail.com'}
                    {...register('email')}
                />
            </label>

            <label htmlFor="password">
                <h4>Enter your password</h4>
                <input
                    className={'border rounded py-2 px-2.5 w-full mt-2.5'}
                    id='password' type="password"
                    {...register('password')}
                />
            </label>
            <p>Don't have an account yet? <Link className={'text-purple-700'} to={'/register'}>Sign-up!</Link></p>
            {error && <p className={'text-red-500'}>{error}</p>}
            <button className={'bg-secondary text-white font-semibold text-[1.5rem] py-2'}>
                Submit
            </button>
        </form>
    );
};

export {LogInForm};