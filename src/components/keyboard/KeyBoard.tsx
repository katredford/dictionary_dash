
import Keys from './Keys'
import letters from './characters.json'
import './keyboard.css'


interface KeyBoardProps {
    keyClick: (char: string) => void;

}

const KeyBoard: React.FC<KeyBoardProps> = ({ keyClick }) => {


    return (
        <>
            <div className="keybox">
                <div className='lettersBox'>

                    {letters.map((letter) => (

                        <Keys
                            key={letter.id}
                            char={letter.letter}
                            onClick={keyClick}
                            className={letter.letter === "P" || letter.letter === "L" ? "key break-after" : "keys"}
                        />
                    ))}
                </div>

            </div>
        </>
    )
};




export default KeyBoard;