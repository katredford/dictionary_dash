import { ChangeEvent, useState } from 'react';
import { useWord } from './context/WordContext';

const ModeSelection = () => {
 const { gameMode } = useWord();
  const [standardMode, setStandardMode] = useState(true);
  const [timedMode, setTimedMode] = useState(false);
  const [endlessMode, setEndlessMode] = useState(false);


  const handleClick = (e: ChangeEvent<HTMLInputElement>) => {
    console.log("mode selection", e.target.value)

    switch (e.target.value) {
      case 'endless':
        setEndlessMode(true);
        setTimedMode(false);
        setStandardMode(false);
        break;
      case 'timed':
        setTimedMode(true);
        setEndlessMode(false);
        setStandardMode(false);
        break;

      default:
        setStandardMode(true);
        setEndlessMode(false);
        setTimedMode(false);
        break;
    }
    gameMode(e.target.value)
  }

  return (
    <>

      <div className="modeSelect">

        <label className="custom-checkbox">
          <input
            value="endless"
            type="checkbox"
            checked={endlessMode}
            onChange={handleClick}
          />
          <span 
            className={`endless ${endlessMode ? "endless--active" : ""}`}>
          </span>
        </label>

        <label className="custom-checkbox">
          <input
            value="timed"
            type="checkbox"
            checked={timedMode}
            onChange={handleClick}
          />
          <span
            className={`timed ${timedMode ? "timed--active" : ""}`}>
          </span>
        </label>


        <label className="custom-checkbox">
          <input
            value="standard"
            type="checkbox"
            checked={standardMode}
            onChange={handleClick}
          />
          <span 
            className={`standard ${standardMode ? "standard--active" : ""}`}>
          </span>

        </label>
      </div>

    </>
  )
};

export default ModeSelection;