import React from 'react';
import {LogInForm} from "../components/LoginPage/LogInForm/LogInForm";

const LoginPage = () => {
    return (
        <div className={'wrapper'}>
            <main className={'flex mt-[6rem] justify-between'}>
                <aside className={'w-1/3'}>
                    <h4 className={'font-semibold text-3xl mb-5'}>Login to Access Your Task List</h4>
                    <p className={'text-wrap text-[1.2rem]'}>
                        Enter your credentials to log in and start working on your tasks.
                        If you don’t have an account yet, please sign up to create and organize your tasks.
                    </p>
                </aside>
                <LogInForm/>

            </main>
        </div>
    );
};

export {LoginPage};