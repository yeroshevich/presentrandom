
import SnowLayout from "../components/SnowLayout";
import LoginForm from "../components/LoginForm";
import React, {memo} from "react";

const Home = () =>{
    return (
        <SnowLayout>
            <LoginForm></LoginForm>
        </SnowLayout>
    )
}
export default React.memo(Home)
