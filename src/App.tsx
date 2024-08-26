import React from 'react';
import { WordProvider } from './components/context/WordContext';
import WordDisplay from './components/WordDisplay';
import Input from './components/Input';



const App: React.FC = () => {
  return(
    <WordProvider>
      <WordDisplay />
      <Input />
    </WordProvider>
  );
};

export default App;