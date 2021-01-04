import axios from 'axios';

export const fetchGrades = () => {
    
    const endPoint = '/grades.json'
    
    const headers = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods':'GET',
        'Access-Control-Allow-Headers':'Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization',
        'Access-Control-Allow-Credentials':'true',
      }
    
    }
    return axios.get(endPoint, headers)
    
}