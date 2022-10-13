import axios from "axios"
import { GetServerSideProps, NextPage } from "next"
import { JobApplied } from "../../components/job/JobApplied"
import { Layout } from "../../components/layout"
import { isAuthenticated } from "../../utils/isAuthenticated"


interface Props {
    jobs:any
  }


const JobsApplied: NextPage<Props> = ({jobs}) => {


    return (

      <Layout title={'Trabajos ya aplicados'}  >
        <JobApplied jobs={jobs}/>
      </Layout>
    )
  }

  export default JobsApplied


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

    const res = await  axios.get(`${process.env.API_URL}/api/me/jobs/applied/`,{
        headers:{
            Authorization: `Bearer ${access_token}`
        }
    })

    const jobs = res.data

   return {
     props: {
        jobs
     }
   }
 }

