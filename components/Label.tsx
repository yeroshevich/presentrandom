import {ReactNode} from "react";

interface LabelProps{
    children?:ReactNode,
    className?:string
}
const Label = ({className,children}:LabelProps) => {
    return (
        <div className={className}>
            {children}
        </div>
    );
};

export default Label;