
import Keys from './Keys'
import letters from './characters.json'
import './keyboard.css'


interface KeyBoardProps {
    
    keyClick: (char: string) => void;
    
}

const KeyBoard: React.FC<KeyBoardProps> = ({keyClick}) => {


    // const handleKeyCLick = (char: string) => {
    //     console.log(char);
    // }


    return (
        <>
            <div className="keybox">
                <div className='lettersBox'>

                    {letters.map((letter) => (
                        <Keys key={letter.id} char={letter.letter} onClick={keyClick} />
                    ))}
                </div>
           
            </div>
        </>
    )
};




export default KeyBoard;