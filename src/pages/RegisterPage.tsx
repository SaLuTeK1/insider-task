import React from 'react';
import {RegisterForm} from "../components/RegisterPage/RegisterForm";

const RegisterPage = () => {


    return (
        <main className={'wrapper py-[4rem]'}>
            <div className={'flex justify-between'}>
                <aside className={'w-1/3'}>
                    <h4 className={'font-semibold text-3xl mb-5'}>Create an Account to Get Started</h4>
                    <p className={'text-wrap text-[1.2rem]'}>
                        Sign up to create your account and start organizing your tasks. It's quick and easy!
                        Once you're registered, you'll be able to access and manage your task list seamlessly.
                    </p>
                </aside>
                <RegisterForm/>
            </div>
        </main>
    );
};

export {RegisterPage};