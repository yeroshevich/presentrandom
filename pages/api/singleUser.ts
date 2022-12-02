import {NextApiRequest, NextApiResponse} from "next";
import {SilentUser} from "../../model/silentUser";
import {PresentContext} from "../../lib/PresentContext";

export default function handler (req:NextApiRequest,res:NextApiResponse){
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

const handleGet = async(req:NextApiRequest,res:NextApiResponse<SilentUser | null>)=>{
    const userID = parseInt(req.query['idUser'] as string)
    const user = await PresentContext.getUserById(userID)
    res.status(200).json(user)
}

const handlePost = async(req:NextApiRequest,res:NextApiResponse)=>{
    type Ids = {
        idUser:number,
        presenterId:number
    }
    const ids = req.body as Ids
     const result = PresentContext.setUserPresenter(ids.idUser,ids.presenterId)
     res.status(200).json(result)
}
