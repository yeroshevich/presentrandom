import {memo, useEffect, useState} from "react";
import styles from '../styles/Modal.module.scss'

interface Coordinate{
    x:number,
    y:number,
}
interface ModalProps{
    closeWindow:()=>void,
    text:string
}
function getRandomArbitrary(min:number, max:number) {
    return Math.floor(Math.random() * (max - min) + min);
}

const Modal = ({closeWindow,text}:ModalProps) => {
    const [windowCoord,setWindowCoord] = useState<Coordinate>()
    const [buttonCoord,setButtonCoord] = useState<Coordinate>()

    useEffect(()=>{
        setWindowCoord({
            x:getRandomArbitrary(100,1500),
            y:getRandomArbitrary(100,650)
        } as Coordinate)
        setButtonCoord({
            x:getRandomArbitrary(1,4) % 2 ===0?40:280,
            y:getRandomArbitrary(1,4) % 2 ===0?40:260
        } as Coordinate)
    },[])

    return (
        <div className={styles.form} style={{left:windowCoord?.x,top:windowCoord?.y}}>
           <div className={styles.innerContainer}>
               <button onClick={closeWindow} style={{right:buttonCoord?.x,top:buttonCoord?.y}}>X</button>
               <div className={styles.text}>
                   {text}
               </div>
           </div>
        </div>
    );
};

export default memo(Modal);