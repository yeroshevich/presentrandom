import executeQuery from "./db";
import {UserRequest} from "../model/userRequest";
import {User} from "../model/user";
import {SilentUser} from "../model/silentUser";
import  Cryptor from "../pages/api/Cryptor";

export class PresentContext{
    static async login(user:UserRequest){
        // const result = await executeQuery({
        //     query:'SELECT * FROM users WHERE phoneNumber=? AND password=?',
        //     values:[Cryptor.Encrypt(user.phoneNumber),Cryptor.Encrypt(user.password)]
        // })
        // const obj = (result as []).at(0)
        // if(!obj) return null;
        // return parseSqltoUser(obj)
        const users=  await this.getUsers()
        const findedUser =  users.filter(x=>{
            const phone = getDecryptedFormatedString(x.phoneNumber)
            const pass = getDecryptedFormatedString(x.password)
            if(phone === user.phoneNumber  && pass === user.password)
                return x
        }).at(0)
        return findedUser
    }
    static async getUserById(id:number)
    {
        const result = await executeQuery({
            query:'SELECT idUser,name,phoneNumber FROM users WHERE idUser = ?',
            values:[id.toString()]
        })
        const obj = (result as []).at(0)
        if(!obj) return null
        const user = parseSqltoUser(obj) as SilentUser
        return {...user,phoneNumber:getDecryptedFormatedString(user.phoneNumber)}
    }
    static async getUsersExceptIdAndWithoutPresenter(idUser:number,presenterId:number){
        const result = await executeQuery({
            //query:'SELECT idUser,name,presenterId FROM users WHERE (isnull(presenterId) OR presenterId != ?) AND idUser != ? AND idUser != ?',
            query:'SELECT idUser,name,phoneNumber FROM users u WHERE (ISNULL(u.presenterId) OR u.presenterId != ?) AND u.idUser != ? AND ISNULL((SELECT name FROM users u1 WHERE u1.presenterId = u.idUser)) ORDER BY RAND()',
            values:[idUser.toString(),idUser.toString()]
        })
        const users = (result as []).map(x=>{
            const user = parseSqltoUser(x)
            return {...user,phoneNumber:getDecryptedFormatedString(user.phoneNumber)}
        })
        return users
    }
    static async getUsers(){
        const result = await executeQuery({
            query:'SELECT * FROM users',
            values:[]
        })
        const users = (result as []).map(x=>parseSqltoUser(x))
        return users
    }
    static async setUserPresenter(userId:number,presenterId:number)
    {
        const result = await executeQuery({
            query:'UPDATE users SET presenterId = ? WHERE idUser = ?',
            values:[userId.toString(),presenterId.toString()]
        })
        return result
    }
    static async CryptUsers(users:User[]){
        for (const user of users) {
            const result = await executeQuery({
                query:`UPDATE users SET password= ? , phoneNumber = ? WHERE idUser = ?`,
                values:[Cryptor.Encrypt(user.password),Cryptor.Encrypt(user.phoneNumber),user.idUser.toString()]
            })
        }
        return 'ok'
    }
}
function parseSqltoUser(obj:object) : User{
    try{
        const user = JSON.parse(JSON.stringify(obj)) as User
        return user
    }catch (e)
    {
        console.log(e)
        return {idUser:0,phoneNumber:'',password:'',presenterId:undefined,name:''}
    }
}
function getDecryptedFormatedString(text:string){
    const decrypted = Cryptor.Decrypt(text)
    return decrypted.slice(1,decrypted.length-1)
}