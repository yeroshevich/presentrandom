import styles from '../styles/Auth.module.scss'
// @ts-ignore
import InputMask from 'react-input-mask'
import Label from "./Label";
import {useInput} from "../hook/useInput";
import axios from "axios";
import {useRedirect} from "../lib/redirectTo";
import {useUser} from "../hook/useUser";
import {useEffect} from "react";
import {User} from "../model/user";

const LoginForm = () => {
    const redirect = useRedirect()
    const {saveUser,isAutorized} = useUser()
    const phoneInput = useInput('')
    const passInput = useInput('')
    const authorize = async (e:React.MouseEvent<HTMLButtonElement>)=>{
        e.preventDefault()
        const tempUser = await axios.get('/api/auths',{params:{phoneNumber:phoneInput.value?.slice(1),password:passInput.value}})
        const user = tempUser.data as User

        if(!isAutorized(user)) return

        saveUser(user)
        redirect("/userroom")
    }
    useEffect(()=>{
        if(localStorage.getItem('user') != undefined)
            redirect('/userroom')
    },[])

    return (
        <div className={styles.block}>
            <div className={styles.authForm}>
                <Label className={styles.label}>
                    <h2>Тайный санта</h2>
                </Label>
                <form className={styles.form}>
                    <div>
                        <InputMask
                            mask={'8(099)9999999'}
                            style={{'textAlign':'center'}}
                            placeholder={'Номер телефона'}
                            value={phoneInput.value}
                            onChange={phoneInput.onChange}
                            ref={null}
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            value={passInput.value}
                            onChange={passInput.onChange}
                            placeholder={'Пароль'}
                        />
                    </div>
                    <div>
                        <button onClick={(e)=>authorize(e)}>Войти</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;