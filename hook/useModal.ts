import {useState} from "react";

export default function (){
    const [exceptionText,setExceptionText] = useState<string>('')
    const [isModalVisibility,setIsModalVisibility] = useState<boolean>(false)
    const closeModal = ()=>{
        setIsModalVisibility(false)
    }
    const showModal = (text:string)=>{
        setExceptionText(text)
        setIsModalVisibility(true)
    }
    return {isModalVisibility,exceptionText,closeModal,showModal}
}