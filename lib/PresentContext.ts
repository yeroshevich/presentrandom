import executeQuery from "./db";
import {UserRequest} from "../model/userRequest";
import {User} from "../model/user";
import {SilentUser} from "../model/silentUser";
import Cryptor from "./Cryptor";

export class PresentContext{
    static async login(user:UserRequest):Promise<User | null>{
        // const result = await executeQuery({
        //     query:'SELECT * FROM users WHERE phoneNumber=? AND password=?',
        //     values:[Cryptor.Encrypt(user.phoneNumber),Cryptor.Encrypt(user.password)]
        // })
        // const obj = (result as []).at(0)
        // if(!obj) return null;
        // return parseSqltoUser(obj)

        const users=  await this.getUsers()
        const findedUser =  users.filter(x=>{
            if(x.phoneNumber.slice(1,x.phoneNumber.length-1) === user.phoneNumber  && x.password.slice(1,x.password.length-1) === user.password)
                return x
        }).at(0)
        return findedUser? findedUser:null
    }
    static async getUserById(id:number)
    {
        const result = await executeQuery({
            query:'SELECT idUser,name,phoneNumber FROM users WHERE idUser = ?',
            values:[id.toString()]
        })
        const obj = (result as []).at(0)
        if(!obj) return null
        return parseSqltoUser(obj) as SilentUser

    }
    static async getUsersExceptIdAndWithoutPresenter(idUser:number,presenterId:number){
        const result = await executeQuery({
            //query:'SELECT idUser,name,presenterId FROM users WHERE (isnull(presenterId) OR presenterId != ?) AND idUser != ? AND idUser != ?',
            query:'SELECT idUser,name,phoneNumber FROM users u WHERE (ISNULL(u.presenterId) OR u.presenterId != ?) AND u.idUser != ? AND ISNULL((SELECT name FROM users u1 WHERE u1.presenterId = u.idUser))',
            values:[idUser.toString(),idUser.toString()]
        })
        const users = (result as []).map(x=>parseSqltoUser(x))
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
function parseSqltoUser(obj:object){
    type ObjectKey = keyof typeof obj

    return {
        idUser: obj['idUser' as ObjectKey],
        name: obj['name' as ObjectKey],
        password: Cryptor.Decrypt(obj['password' as ObjectKey]),
        presenterId: obj['presenterId' as ObjectKey],
        phoneNumber:Cryptor.Decrypt(obj['phoneNumber' as ObjectKey])
    } as User;
}