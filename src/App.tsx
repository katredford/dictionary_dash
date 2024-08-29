import React, { useState, useEffect } from 'react';
import { WordProvider } from './components/context/WordContext';
import WordDisplay from './components/WordDisplay';
import Input from './components/Input';
import ScoreList from './components/ScoreList';

import Start from './components/Start';
const App: React.FC = () => {

  const [time, setTime] = useState<number>(60);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isRestarting, setIsRestarting] = useState<boolean>(false);



  useEffect(() => {
    if (time === 0) {
      setIsStarted(false);
    }
  }, [time])


  const handleTimeStart = () => {
    localStorage.clear();
    setIsRestarting(false);
    setIsStarted(true);
    setTime(60);
    const timer = setInterval(() => {
      setTime(prevTime => {
        if (prevTime === 0) {
          clearInterval(timer);
          setIsRestarting(true);
          return prevTime;
        }
        return prevTime - 1;
      })
    }, 1000)

    return timer;
  };


  return (
    <>

      {/* <WordProvider>
    <WordDisplay />
    <Input />
    <ScoreList />
    </WordProvider> */}


      {!isStarted &&
        <WordProvider>
          <button onClick={handleTimeStart}>
            {isRestarting ? 'AGAIN' : 'START'}
          </button>
        </WordProvider>
      }

      {isStarted && time > 0 && (
        <>
          <p>Time Remaining: {time} seconds</p>
          <WordProvider>
            <WordDisplay />
            <Input />
          </WordProvider>
        </>
      )}

      {time === 0 &&
        <WordProvider>
          <ScoreList />
        </WordProvider>
      }


    </>
  );
};

export default App;