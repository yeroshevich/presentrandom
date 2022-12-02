import {NextApiRequest, NextApiResponse} from "next";
import {PresentContext} from "../../lib/PresentContext";

export default function handler(req:NextApiRequest,res:NextApiResponse){
    try{
        if(req.method==='GET')
            handleGet(req,res)
        else
            res.status(404).end('endpoint not found')
    }catch (e)
    {
        res.status(500).end({e})
    }
}
const handleGet = async (req:NextApiRequest,res:NextApiResponse)=>{
    const ids = {idUser:parseInt(req.query['idUser'] as string),presenterId:parseInt(req.query['presenterId'] as string)}
    const users = await PresentContext.getUsersExceptIdAndWithoutPresenter(ids.idUser,ids.presenterId)
    res.status(200).json(users)
}