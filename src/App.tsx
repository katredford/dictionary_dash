import React, { useState, useEffect } from 'react';
import getAPI from './API';
import Input from './components/Input';

import wordlist from './wordlist.json'

const App: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);


  function randomWord() {
    const randomIndex = Math.floor(Math.random() * wordlist.length)

    const randomWord = wordlist[randomIndex]

    // console.log(randomWord.word, 'random random');
    return randomWord.word;
  }

  const fetchData = async (word: string) => {
    try {
      const response = await getAPI(word);
      console.log("response response", response.data[0].word);
      setData(response.data);
    } catch (err: any) {
      if (err.response && err.response.status === 404) {
        // handle 404 error: Retry with a new random word
        console.log("404 Not Found, retrying...");
        fetchData(randomWord());
      } else {
        // handle other errors
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const word = randomWord();
    fetchData(word);
  }, []);

  console.log('Current Data:', data);
  console.log("what", data)
  console.log("definitions", data[0]?.meanings[0].definitions[0]
  )

  return (
    <>
    
      <h1>
        {data[0]?.meanings[0].definitions[0].definition}
      </h1>
      {data.length > 0 && data[0].word && <Input word={data[0].word} />}



    </>
  )
}

export default App;