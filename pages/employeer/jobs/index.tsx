
import { NextPage } from "next"
import { Layout } from "../../../components/layout"
import Link from "next/link";
import useEffect from 'react';

useEffect
interface Props {
  access_token:string,
  jobs:any
}



const Index: NextPage<Props> = ({jobs,access_token}) => {


    return (

      <Layout title={'My jobs'}  >

       <MyJobs  access_token={access_token} />

          {/* <MyJobs jobs={jobs} access_token={access_token} /> */}
      </Layout>
    )
  }

  export default Index


  import { GetServerSideProps } from 'next'
  import { isAuthenticated } from '../../../utils/isAuthenticated';

import axios from "axios";

import { NewJobs } from "../../../components/job/NewJobs"
import MyJobs from "../../../components/job/MyJobs"




    export const getServerSideProps: GetServerSideProps = async ({req}) => {


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
        },
      };
    }