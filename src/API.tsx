import axios from 'axios'

interface Params {
    baseUrl: string,
    method: string
}


const getConfig: Params = {
    baseUrl: `https://api.dictionaryapi.dev/api/v2/entries/en/`,
    method: 'GET'
}

const getAPI = async (word: string, ) : Promise<any> => {
    try {
        const response = await axios({
            ...getConfig,
            url: `${getConfig.baseUrl}${word}`
        });

        console.log('axios response', response)

        return {
            status: response.status,
            data: response.data
        }
    } catch (error: any) {
        console.error('Axios Request Error', error);

        return {
            status: error.response?.status || 'Unknown Status',
            data: error.response?.data || 'No Data'
        }
    }
    

};

export default getAPI;