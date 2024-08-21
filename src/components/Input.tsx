import React, { useState, useEffect } from 'react';

interface InputProps {
    word: string;
}

const Input: React.FC<InputProps> = ({ word }) => {
    const [typedChars, setTypedChars] = useState<string[]>(new Array(word.length).fill(''));
    const wordChars = word.split('');



    const handleKeyPress = (event: KeyboardEvent) => {
        const { key } = event;

        // Update the state based on the key pressed
        setTypedChars((prevTypedChars) => {
            const updatedChars = [...prevTypedChars];
            console.log(updatedChars, "chssarr shart")
            if (key === 'Backspace') {
                const index = updatedChars.indexOf('');
                if (index === -1) {
                  
                    updatedChars[updatedChars.length -1 ] = ''
                    } else if (index > 0) {
                        updatedChars[index - 1] = '';
                    }
                }
             else if (key.length === 1 && /[a-zA-Z0-9]/.test(key)) {
               
                const index = updatedChars.indexOf('');
                if (index !== -1) {
                    updatedChars[index] = key;
                }
            }
            return updatedChars;
        });
    };

    useEffect(() => {
        const handleKeyPressEvent = (event: KeyboardEvent) => handleKeyPress(event);

        window.addEventListener('keydown', handleKeyPressEvent);

        return () => {
            window.removeEventListener('keydown', handleKeyPressEvent);
        };
    }, [typedChars]);

    return (
        <>
            <h1>Type the Word:</h1>
            <div className='wordbox'>
                {wordChars.map((char, index) => (
                    <div>
                        <ul>
                            <li>{typedChars[index].toUpperCase()} </li>
                        </ul>
                        <div
                            className='blank'
                            key={index}

                        >
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Input;




