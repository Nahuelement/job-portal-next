import React, { FC } from 'react'
import { Layout } from '../../../components/layout'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import { isAuthenticated } from '../../../utils/isAuthenticated'
import NotFound from '../../../components/layout/NotFound'
import { UpdateJob } from '../../../components/job/UpdateJob'



interface Props{
    access_token:any,
    id:number,
    job:any,
    error:any
       }


const JobDetail:FC<Props> = ({access_token, job, error}) => {

    if(error?.includes('Not found')) return <NotFound />

    console.log(job)

  return (
    <Layout title='Actualizar trabajo' >
    <UpdateJob job={job} access_token = {access_token} />
  </Layout>
  )
}


export default JobDetail


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({req,params}) => {


    const access_token = req.cookies.access || ''
      const user  = await isAuthenticated(access_token)


      if(!user){
          return {
              redirect:{
                  destination:'/login',
                  permanent:false
              }
          }
      }


try {

    const res = await axios.get(
        `${process.env.API_URL}/api/jobs/${params?.id}`,
        {
            headers:{
                Authorization: `Bearer ${access_token}`
            }
        }
    )

    const job = res.data.job


    return{
        props:{
            job,
            access_token
        }
    }

} catch (error:any) {
    return {
        props: {
           error:error!.response.data.detail
        }
      }


}



   }



