import {User} from "../model/user";

interface RandomizeUserProps{
    user:User,
    handleClickRandom:()=>void
}

const RandomizeUser = ({user,handleClickRandom}:RandomizeUserProps) => {
    return (
        <div>
            {user && <div>
                <button onClick={handleClickRandom}>Получить пользователя</button>
            </div>}
        </div>
    );
};

export default RandomizeUser;