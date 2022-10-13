import axios, { AxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

type Data = any

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'GET':
            return geUser(req,res)


        default:
            return res.status(400).json({ message: 'Mhod not found' });
    }




}

const geUser = async(req: NextApiRequest, res: NextApiResponse<Data>) =>{


    const cookies = cookie.parse(req.headers.cookie || '')

    const access = cookies.access
    console.log({'acces':access})

    if(!!!access){
        return res.status(401).json({ message: 'Ingresa a tu cuenta primero' });

    }


    try {
        const response = await axios.get(`${process.env.API_URL}/api/me/`,
       {
            headers:{'Authorization':`Bearer ${access}`}
        })



        if(response.data){

            console.log()

            return res.status(200).json({ user:response.data });
        }
        else{
            return res.status(400).json({ message: 'User dont exist' });
        }
    }
    catch(error) {
        if (axios.isAxiosError(error))  {
            console.log(error.response?.data)
            if (error.response?.data){
                return res.status(error.response.status).json(error.response?.data );

            }

        } else {
        console.log( error )
        }
      }

}
