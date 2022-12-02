import executeQuery from "./db";
import {UserRequest} from "../model/userRequest";
import {User} from "../model/user";
import {SilentUser} from "../model/silentUser";

export class PresentContext{
    static async login(user:UserRequest):Promise<User | null>{
        const result = await executeQuery({
            query:'SELECT * FROM users WHERE phoneNumber=? AND password=?',
            values:[user.phoneNumber,user.password]
        })
        const obj = (result as []).at(0)
        if(!obj) return null;
        return parseSqltoUser(obj)
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
            query:'SELECT idUser,name,phoneNumber FROM users u WHERE (ISNULL(u.presenterId) OR u.presenterId != ?) AND u.idUser != ?',
            values:[idUser.toString(),idUser.toString()]
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
}
function parseSqltoUser(obj:object){
    type ObjectKey = keyof typeof obj

    return {
        idUser: obj['idUser' as ObjectKey],
        name: obj['name' as ObjectKey],
        password: obj['password' as ObjectKey],
        presenterId: obj['presenterId' as ObjectKey],
        phoneNumber:obj['phoneNumber' as ObjectKey]
    } as User;
}