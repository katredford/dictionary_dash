import React, { useState, useEffect } from 'react';
import  getAPI  from './API';
import Input from './components/Input'

const App: React.FC = () => {
  const [data, setData] = useState<any>([]);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAPI('example')
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log('Current Data:', data);
  console.log("what", data)

  return (
    <>
    what
      {/* <div>
        {loading && <p>Loading...</p>}
        {error && <p>Error: {error.message || 'Something went wrong!'}</p>}
        {data && (
          <div>
            <h1>API Response</h1>
            <pre>{JSON.stringify(data, null, 2)}</pre>
          </div>
        )}
      </div> */}
      {data.length > 0 && data[0].word && <Input word={data[0].word} />}
     {/* <Input word={data[0].word} /> */}
    </>
  )
}

export default App;