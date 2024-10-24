import Auth from '../../../auth/auth'
import { GameData } from "../types";

export const addGame = async (gameInfo: GameData) => {
  console.log("add game", gameInfo)
  try {
    const response = await fetch(`/api/games`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify(gameInfo)
    });
    const data = await response.json();
    if(!response.ok) {
      throw new Error('Game information not retrieved, check network tab!');
    }
    console.log("getting a game?", data)
    return data;
  } catch(err) {
    console.log('Error from add game: ', err);
    return Promise.reject('Could not fetch GAME info');
  }
  
  
}