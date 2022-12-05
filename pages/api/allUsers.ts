import {NextApiRequest, NextApiResponse} from "next";
import {PresentContext} from "../../lib/PresentContext";

export default function handler(req:NextApiRequest,res:NextApiResponse){
    try{
        if(req.method==='GET')
            handleGet(req,res)
        else if(req.method==='POST')
            handlePost(req,res)
        else
            res.status(404).end('endpoint not found')
    }catch (e)
    {
        res.status(500).end({e})
    }
}
const handleGet = async (req:NextApiRequest,res:NextApiResponse)=>{
     const users = await PresentContext.getUsers()
     res.status(200).json(users)
}
const handlePost = async (req:NextApiRequest,res:NextApiResponse)=>{
     const result = await PresentContext.CryptUsers(req.body)
     res.status(200).json(result)

}