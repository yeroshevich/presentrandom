import SnowLayout from "../../components/SnowLayout";
import { useUser} from "../../hook/useUser";
import HelloWords from "../../components/HelloWords";
import styles from '../../styles/UserRoom.module.scss'
import {GetStaticProps, NextPage} from "next";
import {SilentUser} from "../../model/silentUser";
import RandomizeUser from "../../components/RandomizeUser";
import {useRedirect} from "../../lib/redirectTo";
import axios from "axios";
import {useEffect, useState} from "react";
import {User} from "../../model/user";



const Index:NextPage= () => {
    const {user,logoutUser,saveUser} = useUser()
    const [users,setUsers] = useState<User[]>([])
    const [presenter,setPresenter] = useState<SilentUser>()
    const redirect = useRedirect()
    const logOut = ()=>{
        logoutUser()
        redirect('/')
    }
    async function fetchPresenter(id: number | undefined){
        const fetchedUser =  await axios.get('/api/singleUser',{params:{idUser:id}})
        return fetchedUser
    }
    async function fetchUsers(idUser:number | undefined, presenterId:number | undefined){
        const fetchedUsers = await axios.get('/api/users',{params:{idUser,presenterId}})
        return fetchedUsers
    }
    async function updatePresenter(idUser:number,presenterId:number)
    {
        const result = await axios.post('/api/singleUser',{idUser,presenterId})
        return result
    }
    function randomizePresenter(){
        if(!users)return
        const randomedUser = users.at(Math.random()*users.length)
        if(!randomedUser)return
         updatePresenter(randomedUser.idUser,user.idUser)
             .then(x=>{
                setPresenter(randomedUser)
                 saveUser({...user,presenterId:randomedUser.idUser})
            })
             .catch(x=>alert('Something wrong, write message to Valeriy'))

    }
    useEffect(()=>{
        const userString = localStorage.getItem('user');
        let tempUser = null
        if(userString != undefined)
        {
            tempUser = (JSON.parse(userString) as User)
            fetchPresenter(tempUser.presenterId).then(r => setPresenter(r.data))
        }
        if(tempUser)
        {
            fetchUsers(tempUser.idUser,tempUser.presenterId).then(u=>{
                setUsers(u.data)
            })
        }
    },[])
    return (
        <SnowLayout>

            <div className={styles.mainBlock}>
                <div className={styles.userForm}>
                    <div className={styles.logOutBlock}>
                        <button onClick={logOut}>
                            Logout
                        </button>
                    </div>
                    <div className={styles.words}>
                        <HelloWords user={user}>
                            {
                                !presenter && <div className={styles.rules}>
                                    Правила такие:
                                    <div>
                                        <ul>
                                            <li>1. Стоимость подарка не превышает 20 рублей</li>
                                            <li>2. Подарок <strong>ОБЯЗАН</strong> понравиться получателю</li>
                                        </ul>
                                    </div>
                                </div>
                            }
                        </HelloWords>
                    </div>
                    {
                        presenter
                            ? <div>
                                <h3>Бог рандома определил что вы дарите человеку с именем:</h3>
                                <div className={styles.presenter}>
                                    <div>
                                        {presenter.name}
                                    </div>
                                    <div>
                                        8{presenter.phoneNumber}
                                    </div>
                                </div>
                            </div>
                            :
                            <div className={styles.randomButton}>
                                <RandomizeUser user={user} handleClickRandom={randomizePresenter}/>
                            </div>

                    }
                </div>
            </div>
        </SnowLayout>
    );
};

export default Index;