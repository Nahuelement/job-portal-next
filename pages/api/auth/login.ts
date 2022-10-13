import axios, { AxiosError } from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie'

type Data = {
    message: string
} | {
    success:boolean
} | { error: ' mail o password invalido' } |
{}

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
    switch (req.method) {
        case 'POST':
            return authenticatePost(req,res)


        default:
            return res.status(400).json({ message: 'Mhod not found' });
    }




}

const authenticatePost = async(req: NextApiRequest, res: NextApiResponse<Data>) =>{

    const{ username, password} = req.body



    try {
        const response = await axios.post(`${process.env.API_URL}/api/token/`,
        {
            username,
            password
        },{
            headers:{'Content-Type':'application/json'}
        })



    if(response.data.access){

        res.setHeader('Set-Cookie',[
            cookie.serialize('access', response.data.access,{
                httpOnly:true,
                secure:process.env.NODE_ENV !=='development',
                maxAge:60 * 60 * 24,
                sameSite:'lax',
                path:'/'

            })
        ])

        return res.status(200).json({ success: true });

        }
        else{
            return res.status(400).json({ message: 'Authentication failed' });
        }
    } catch(error) {
        if (axios.isAxiosError(error))  {
            console.log(error.response?.data)
            if (error.response?.data){
                return res.status(error.response.status).json( error.response?.data );

            }

        } else {
         
        }
      }

}
