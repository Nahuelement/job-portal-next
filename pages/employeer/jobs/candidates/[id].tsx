import React, { FC } from 'react'
import { Layout } from '../../../../components/layout'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import { isAuthenticated } from '../../../../utils/isAuthenticated'
import JobsCandidates from '../../../../components/job/JobCandidates'


interface Props{
    access_token:any,
    id:number
       }


const JobDetail:FC<Props> = ({access_token, id}) => {

  return (
    <Layout title='job candidate' >
    <JobsCandidates access_token = {access_token} id={id}/>
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





       return {
         props: {
            access_token,
            id:params?.id
         }
       }

   }



