import { useState, useEffect, useRef } from 'react';
import { useWord } from './context/WordContext';
import KeyBoard from './keyboard/KeyBoard';


const Input = () => {
    const skipButtonRef = useRef<HTMLButtonElement | null>(null);
    const { currentWord, saveWordToLocalStorage, fetchNewWord } = useWord();
    const [typedChars, setTypedChars] = useState<string[]>([]);
    const [skipped, setSkipped] = useState<boolean>(false);

    useEffect(() => {
        setTypedChars(new Array(currentWord.length).fill(''));
        setSkipped(false);
    }, [currentWord]);

    const wordChars = currentWord.split('').map(char => char.toUpperCase());

    const handleKeyClick = (char: string) => {
        if (skipped && char !== 'NEXT') return;
    
        setTypedChars(prevTypedChars => {
            const updatedChars = [...prevTypedChars];
            if (char === 'BACK') {
                const index = updatedChars.indexOf('');
                if (index === -1) {
                    updatedChars[updatedChars.length - 1] = '';
                } else if (index > 0) {
                    updatedChars[index - 1] = '';
                }
            } else if (char.length === 1 && /[a-zA-Z0-9]/.test(char)) {
                const index = updatedChars.indexOf('');
                if (index !== -1) {
                    updatedChars[index] = char;
                }
            } else if (char === 'ENTER') {
                handleSubmit(false);
            } else if (char === 'SKIP') {
                handleSubmit(true);
                setTypedChars(wordChars);
            }
            return updatedChars;
        });
    };


    const handleKeyPress = (event: KeyboardEvent) => {
        const { key } = event;
        if (skipped) return;

        setTypedChars(prevTypedChars => {
            const updatedChars = [...prevTypedChars];
            if (key === 'Backspace') {
                const index = updatedChars.indexOf('');
                if (index === -1) {
                    updatedChars[updatedChars.length - 1] = '';
                } else if (index > 0) {
                    updatedChars[index - 1] = '';
                }
            } else if (key.length === 1 && /[a-zA-Z0-9]/.test(key)) {
                const index = updatedChars.indexOf('');
                if (index !== -1) {
                    updatedChars[index] = key.toUpperCase();
                }
            } else if (key === 'Enter') {
                handleSubmit(false);
            }
            return updatedChars;
        });
    };

    const handleSubmit = (isSkipped: boolean) => {
        const wordArray = JSON.parse(localStorage.getItem("userAnswer") || "[]");
        const wordObject = wordArray.find((item: any) => item.word === currentWord);
        const joinedChars = typedChars.join('');
        const isWordCorrect = joinedChars.toUpperCase() === currentWord.toUpperCase();
    
        saveWordToLocalStorage(currentWord, isSkipped, wordObject?.definition || "", wordObject?.id);
    

        if (isSkipped) {
            setSkipped(true);
            setTypedChars(wordChars);
        } else if (isWordCorrect) {
            // delay fetchNewWord call
            setTimeout(() => {
                fetchNewWord();
            }, 0);
            setSkipped(false);
        }
    };
    

    useEffect(() => {
        const handleKeyPressEvent = (event: KeyboardEvent) => handleKeyPress(event);
        window.addEventListener('keydown', handleKeyPressEvent);
        return () => {
            window.removeEventListener('keydown', handleKeyPressEvent);
        };
    }, [typedChars]);

    useEffect(() => {
        if (skipButtonRef.current) {
            skipButtonRef.current.blur();
        }
    }, [skipped]); 

    return (
        <>
            <h3>Type the Word Starting with:
                <span className='startLetter'>{wordChars[0]}</span>
            </h3>
            <div className='wordbox'>
                {wordChars.map((char, index) => (
                    <div className='blank' key={index}>
                        <li key={index} value={char}>
                            {typedChars[index] || (skipped ? wordChars[index] : '')}
                        </li>
                    </div>
                ))}
            </div>
            <div className='column'>
                <KeyBoard keyClick={handleKeyClick} />
                <div className='spKeyBox'>
                    {skipped ? (
                        <button 
                        className="spKeys" 
                        onClick={fetchNewWord}
                        >
                            NEXT
                        </button>
                    ) : (
                        <button 
                        ref={skipButtonRef}
                        className="spKeys" 
                        style={{backgroundColor: "#ff0404b3"}}
                        onClick={() => handleKeyClick("SKIP")}
                        >
                            SKIP
                        </button>
                    )}
                    <button
                        style={{ backgroundColor: skipped ? 'grey' : '#e3e0cf' }}
                        className="spKeys"
                        onClick={() => handleKeyClick("ENTER")}
                        disabled={skipped}
                    >
                        ENTER
                    </button>
                    <button className="spKeys" onClick={() => handleKeyClick("BACK")}>←</button>
                </div>
            </div>
        </>
    );
};

export default Input;
