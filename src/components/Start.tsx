import React, {useState} from 'react';

const Start: React.FC = () => {
    const [time, setTime] = useState<number>(30);


    const handleTimeStart = () => {
        const timer = setInterval(() => {
            setTime(prevTime => prevTime -1)
        }, 1000)

        return timer;
    }

    return(
        <>
        <button onClick={handleTimeStart}>
            START
        </button>
        {time}
        </>
    )
};

export default Start;