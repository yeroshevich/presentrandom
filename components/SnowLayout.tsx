import styles from '../styles/SnowLayout.module.scss'
import {ReactNode, useCallback} from "react";

interface SnowLayoutProps{
    children?:ReactNode
}

const SnowLayout = function ({children}:SnowLayoutProps)  {

    return (
        <div>
            {children}
            {
                Array(100).fill(0,1,100).map(x=><div key={Math.random()} className={styles.snow}></div>)
            }
        </div>
    );
};

export default SnowLayout;