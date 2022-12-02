import {User} from "../model/user";
import {ReactNode} from "react";
interface HelloWordsProps{
    user:User,
    children?:ReactNode
}
const HelloWords = ({user,children}:HelloWordsProps) => {
    return (
        <div> {
        }
            <h2 style={{'filter':'drop-shadow(0 0 10px white)'}}>Здравствуй, {user?.name}</h2>
            <div>{children}</div>
        </div>
    );
};

export default HelloWords;