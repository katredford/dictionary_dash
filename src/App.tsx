import React, { useState, useEffect } from 'react';
import { WordProvider } from './components/context/WordContext';
import WordDisplay from './components/WordDisplay';
import Input from './components/Input';
import ScoreList from './components/ScoreList';
import Header from './components/Header'


const App: React.FC = () => {

  const [time, setTime] = useState<number>(500);
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
      <div className='row column align-center'>
        <Header />


        {/* <WordProvider>
    <WordDisplay />
    <Input />
    <ScoreList />
    </WordProvider> */}


        {!isStarted &&
          <WordProvider>
            <h2>How many words can you guess in 60 seconds?</h2>
            <button
              className='start'
              onClick={handleTimeStart}>
              {isRestarting ? 'AGAIN' : 'START'}
            </button>
          </WordProvider>
        }

        {isStarted && time > 0 && (
          <>
            <p className='timer'>
              {time}
            </p>
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

      </div>
    </>
  );
};

export default App;