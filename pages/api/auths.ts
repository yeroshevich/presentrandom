import {NextApiRequest, NextApiResponse} from "next";
import {UserRequest} from "../../model/userRequest";
import {PresentContext} from "../../lib/PresentContext";
import {User} from "../../model/user";

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try{
        if(req.method ==='GET')
            handleGet(req,res)
        else
        {
            res.status(500).end('endpoint want found')
            return;
        }
    }catch (e)
    {
        res.status(500).json(e)
        return;
    }
}


const handleGet = async (req: NextApiRequest, res: NextApiResponse<User | null>)=>{
    const body = {phoneNumber:req.query['phoneNumber'],password:req.query['password']} as UserRequest
    const user =  await PresentContext.login(body)
    res.status(200).json(user)
}
