
import axios from 'axios'


export const isAuthenticated = async(access_token:string) => {

try {

    const response = await axios.post(`${process.env.API_URL}/api/token/verify/`,{
        token:access_token
    })
    if(response.status ===200)return true
    return false

} catch (error) {

    return false
}

}
