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
        case 'GET':
            return logout(req,res)


        default:
            return res.status(400).json({ message: 'Mhod not found' });
    }




}

const logout = async(req: NextApiRequest, res: NextApiResponse<Data>) =>{



        res.setHeader('Set-Cookie',[
            cookie.serialize('access', "",{
                httpOnly:true,
                secure:process.env.NODE_ENV !=='development',
                maxAge:1,
                sameSite:'lax',
                path:'/'

            })
        ])

    return res.status(200).json({ success: true });


}
