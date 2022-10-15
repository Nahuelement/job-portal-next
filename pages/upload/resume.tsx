import { NextPage } from "next"
import { Layout } from "../../components/layout"
import { GetServerSideProps } from 'next'
import { isAuthenticated } from '../../utils/isAuthenticated';
import { UpLoadResume } from '../../components/user/UpLoadResume';





interface Props {
    access_token:string
  }

  const Index: NextPage<Props> = ({access_token}) => {


      return (

        <Layout title={'Carga tu curriculum'}  >
              <UpLoadResume access_token={access_token} />
        </Layout>
      )
    }

    export default Index


    // You should use getServerSideProps when:
    // - Only if you need to pre-render a page whose data must be fetched at request time

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