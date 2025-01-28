import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

const Header = () => {

    const [uid, setUid] = useState<string>(null)

    useEffect(() => {
        setUid(localStorage.getItem('uid'))
    }, [uid]);

    return (
        <header className={'bg-[#22443593] h-20 flex items-center'}>
            <nav className={'wrapper flex justify-between'}>
                <Link className={'text-2xl hover:text-amber-100 transition'} to={'/'}>UR-TDApp</Link>
                {uid ?
                    <Link className={'text-2xl hover:text-amber-100 transition'} to={'/my_list'}>My Lists</Link>
                    :
                    <
                        Link className={'text-2xl hover:text-amber-100 transition'} to={'/login'}>Log In</Link>
                }
            </nav>
        </header>
    );
};

export default Header;