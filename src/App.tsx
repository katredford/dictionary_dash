import React, { ChangeEvent, useState, useEffect, useRef } from 'react';
import WordDisplay from './components/WordDisplay';
import Input from './components/Input';
import ScoreList from './components/ScoreList';
import Header from './components/Header'


const App: React.FC = () => {

  const [time, setTime] = useState<number>(60);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isRestarting, setIsRestarting] = useState<boolean>(false);
  const [leisureMode, setLeisureMode] = useState(false);
  const [showScore, setShowScore] = useState(false);

  const timerRef = useRef<number | null>(null);


  useEffect(() => {
    if (time === 0 && !leisureMode) {
      setIsStarted(false);
      setShowScore(true);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [time, leisureMode]);


  const handleTimeStart = () => {
    localStorage.clear();
    setIsRestarting(false);
    setIsStarted(true);
    setShowScore(false);

    if (!leisureMode) {
      setTime(60);

      timerRef.current = setInterval(() => {
        setTime(prevTime => {
          if (prevTime > 0) return prevTime - 1;
          return 0;
        });
      }, 1000);

    }

  };


  const handleLeisureModeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLeisureMode(e.target.checked);
    if (e.target.checked && timerRef.current) {
      // clear timer if leisure mode 
      clearInterval(timerRef.current);
      timerRef.current = null;
      setTime(0)
    }
  };

  const handleFinish = () => {
    setShowScore(true);
    setIsStarted(false);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <>
      <div className='row column align-center'>
        <Header />


        <label className="custom-checkbox">
          <input
            type="checkbox"
            checked={leisureMode}
            onChange={handleLeisureModeChange}
          />
          <span className="checkmark"></span>
          Leisure Mode
        </label>


        {isStarted && leisureMode && !showScore && (
          <>
            <button 
            className='finish spKeys' 
            onClick={handleFinish}
            style={{
              backgroundColor: "rgb(46, 42, 20)",
              color: "rgb(225, 224, 205"
              }}
            >
              FINISH
            </button>

            <WordDisplay />
            <Input />

          </>
        )}


        {!isStarted && !showScore && (

          <div className='startBox column'>
            <h2>How many words can you guess in 60 seconds?</h2>
            <button
              className='spKeys'
              onClick={handleTimeStart}
            >
              {isRestarting ? 'AGAIN' : 'START'}
            </button>
          </div>

        )}
        {/* game in progress */}
        {isStarted && time > 0 && !leisureMode && (
          <>
            <p className='timer'>{time}</p>
            <WordDisplay />
            <Input />
          </>
        )}


        {showScore && (
          <>
            <button
              className='spKeys'
              onClick={() => {
                setIsRestarting(true);
                setIsStarted(false);
                setShowScore(false);
                setTime(60);
              }}
            >
              AGAIN
            </button>
            <ScoreList />

          </>
        )}

      </div>
    </>
  );
};

export default App;