import React, { FC } from 'react'
import { Layout } from '../../components/layout'
import { GetServerSideProps } from 'next'
import axios from 'axios'
import JobDetails from '../../components/job/JobDetails'


interface Props{
    job:{
        id: number,
        title: string,
        description: string,
        email: string,
        address:string,
        jobType: string,
        education: string,
        industry: string,
        experience: string,
        salary: number,
        positions: number,
        company: string,
        point: string,
        lastDate: string,
        createdAt: string,
        user: number
      },
      candidate:number,
      access_token:string
}

const JobDetail:FC<Props> = ({job, candidate, access_token}) => {


  return (
    <Layout title={job.title}  >
    <JobDetails job={job} candidate={candidate} access_token={access_token}/>
  </Layout>
  )
}

export default JobDetail


// You should use getServerSideProps when:
// - Only if you need to pre-render a page whose data must be fetched at request time

export const getServerSideProps: GetServerSideProps = async ({req,params}) => {


    try {
    const { data } = await axios.get(`${process.env.API_URL}/api/jobs/${params!.id}`)
    const {job, candidate} = data

    const access_token = req.cookies.access || ''

    return {
        props: {
            job,
            candidate,
            access_token

        }
    }

    } catch (error) {

        console.log(error)
        return {
            redirect: {
                destination: `/job${params!.id}noexiste`,
                permanent: false,
            }
        }

    }

}

