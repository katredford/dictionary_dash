
import Auth from '../auth/auth';

const AddFriend = () => {

  async function clickify() {
    
    const id = '2'
    try {
      
      const response = await fetch( `/api/users/friend/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Auth.getToken()}`
        },
        // body: JSON.stringify(userInfo)
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

  return(
    <>
    <button
    onClick={clickify}
    >
    add friend
    </button>
    </>
  )
};

export default AddFriend;