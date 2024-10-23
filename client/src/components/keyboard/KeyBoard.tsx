import React from 'react';
import Keys from './Keys';
import letters from './characters.json';
import './keyboard.css';

interface KeyBoardProps {
    keyClick: (char: string) => void;
}

const KeyBoard: React.FC<KeyBoardProps> = ({ keyClick }) => {

    const rowOne = letters.slice(0, 10);     
    const rowTwo = letters.slice(10, 19);   
    const rowThree = letters.slice(19, 28);  

    return (
        <>
            <div className="keybox">
                <div className='lettersBox'>
                    <div className="row keyRow">
                        {rowOne.map((letter) => (
                            <Keys
                                key={letter.id}
                                char={letter.letter}
                                onClick={keyClick}
                                className="keys"
                            />
                        ))}
                    </div>

                    <div className="row keyRow">
                        {rowTwo.map((letter) => (
                            <Keys
                                key={letter.id}
                                char={letter.letter}
                                onClick={keyClick}
                                className="keys"
                            />
                        ))}
                    </div>

                    <div className="row keyRow">
                        {rowThree.map((letter) => (
                            <Keys
                                key={letter.id}
                                char={letter.letter}
                                onClick={keyClick}
                                className="keys"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default KeyBoard;





