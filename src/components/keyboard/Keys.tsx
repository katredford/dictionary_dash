import React from 'react'

interface KeysProps {
    char: string;
    onClick: (char: string) => void;
   
}

const Keys: React.FC<KeysProps> = ({char, onClick}) => {

    return(
        <>
        <button 
        className="keys"
        onClick={() => onClick(char)}>{char}
        </button>
        </>
    )
};

export default Keys;