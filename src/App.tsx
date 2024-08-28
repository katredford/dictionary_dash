import React, { useState, useEffect } from 'react';
import { WordProvider } from './components/context/WordContext';
import WordDisplay from './components/WordDisplay';
import Input from './components/Input';
import ScoreList from './components/ScoreList';

import Start from './components/Start';
const App: React.FC = () => {

  const [time, setTime] = useState<number>(60);
  const [isStarted, setIsStarted] = useState<boolean>(false);


  console.log("is started", isStarted)

  useEffect(() => {
    if (time === 0) {
      setIsStarted(false);
    }
  },[time])


  const handleTimeStart = () => {
    localStorage.clear();

    setIsStarted(true);
    const timer = setInterval(() => {
      setTime(prevTime => {
        if (prevTime === 0) {
          clearInterval(timer);
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
        START
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