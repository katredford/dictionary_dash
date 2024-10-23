

interface KeysProps {
    char: string;
    onClick: (char: string) => void;
    className?:string;
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