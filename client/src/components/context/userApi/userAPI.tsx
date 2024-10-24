import Auth from '../../../auth/auth'
import { UserData, UserLogin} from '../types';

// const addFriend = async () => {
    
//   const id = '2'
//   try {
    
//     const response = await fetch( `/api/users/friend/${id}`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${Auth.getToken()}`
//       },
//       // body: JSON.stringify(userInfo)
//     });
//     const data = await response.json();

//     if(!response.ok) {
//       throw new Error('invalid API response, check network tab!');
//     }

//     return data;
//   } catch (err) {
//     console.log('Error from data retrieval: ', err);
//     return [];
//   }
// }

export const signUpFetch = async (userInfo: UserLogin ) => {
  try {
    const response = await fetch( `/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Authorization: `Bearer ${Auth.getToken()}`
      },
      body: JSON.stringify(userInfo)
    });
    const data = await response.json();

    if(!response.ok) {
      throw new Error('invalid API response, check network tab!');
    }

    return data;
  } catch (err) {
    console.log('Error from data retrieval: ', err);
    return [];
  }
}

