import { NextPage } from "next"
import { NewJobs } from "../../../components/job/NewJobs";
import { Layout } from "../../../components/layout"


interface Props {
  access_token:string
}

const Index: NextPage<Props> = ({access_token}) => {


    return (

      <Layout title={'NahuelJob - Update profile'}  >
            <NewJobs access_token={access_token} />
      </Layout>
    )
  }

  export default Index


  import { GetServerSideProps } from 'next'
  import { isAuthenticated } from '../../../utils/isAuthenticated';

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
          access_token
       }
     }
   }