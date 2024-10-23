import { useState, useEffect, useRef } from 'react';
import { useWord } from './components/context/WordContext';
import WordDisplay from './components/WordDisplay';
import Input from './components/Input';
import ScoreList from './components/ScoreList';
import Header from './components/Header';
import Footer from './components/Footer';
import ModeSelection from './components/ModeSelection';
import Login from './components/Login';

const App = () => {
  const { mode, strikes } = useWord();
  const [time, setTime] = useState<number>(60);
  const [isStarted, setIsStarted] = useState<boolean>(false);
  const [isRestarting, setIsRestarting] = useState<boolean>(false);
  const [showScore, setShowScore] = useState(false);

  const timerRef = useRef<number | null>(null);


  useEffect(() => {

    if (time === 0 && mode === 'timed') {
      setIsStarted(false);
      setShowScore(true);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }
  }, [time, mode]);

  //if mode changes game starts over
  useEffect(() => {
    setIsStarted(false);

  }, [mode])

  useEffect(() => {
    if (strikes === 3 && mode === 'standard') {
      setIsStarted(false);
      setShowScore(true);
    }
  }, [strikes, mode]);


  const handleTimeStart = () => {
    console.log("Before remove:", localStorage.getItem('userAnswer'));
localStorage.removeItem('userAnswer');
console.log("After remove:", localStorage.getItem('userAnswer'));

    setIsRestarting(false);
    setIsStarted(true);
    setShowScore(false);

    if (mode === 'timed') {
      setTime(60);

      timerRef.current = setInterval(() => {
        setTime(prevTime => {
          if (prevTime > 0) return prevTime - 1;
          return 0;
        });
      }, 1000);

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

  const getSquare = (index: number): string => {
    return strikes >= index ? '✖️' : '▢';
    '▢'
  };

  return (
    <>

    {/* <Login /> */}

    
      <div className='row column align-center'>
        <Header />

        <ModeSelection />

        {isStarted && mode === 'standard' && !showScore && (
          <>
            <div className='row align-center'>

            <h2 className='strikeBox'>{getSquare(1)}</h2>
            <h2 className='strikeBox'>{getSquare(2)}</h2>
            <h2 className='strikeBox'>{getSquare(3)}</h2>
            
            </div>

            <WordDisplay />
            <Input />

          </>
        )}


        {isStarted && mode === 'endless' && !showScore && (
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

          <div className='startBox row column align-center '>
            <h2>How many words can you guess?</h2>
            <h3>3 skips and its over!</h3>
            <button
              className='spKeys'
              style={{width: '100%'}}
              onClick={handleTimeStart}
            >
              {isRestarting ? 'AGAIN' : 'START'}
            </button>
          </div>

        )}
        {/* game in progress */}
        {isStarted && time > 0 && mode === 'timed' && (
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
      <Footer />
    </>
  );
};

export default App;