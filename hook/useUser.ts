import {useEffect, useState} from "react";
import {User} from "../model/user";
import {SilentUser} from "../model/silentUser";
import {set} from "immutable";

export const useUser =  function (){
    const [user,setUser] = useState<User>()

    useEffect(()=>{
        const storageUser = localStorage.getItem('user')
        if(!storageUser || storageUser==undefined)return
        setUser(JSON.parse(storageUser))
    },[])
    const isAutorized = (user:User):boolean =>{
        return user && user.idUser>=1
    }
    const saveUser = (user:User)=>{
        localStorage.setItem('user',JSON.stringify(user))
    }
    const logoutUser = ()=>{
        localStorage.removeItem('user')
    }

    return {user:user as User,saveUser,isAutorized,logoutUser}
}
