import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { Layout , Loader} from '../components/layout'
import styles from '../styles/Home.module.css'
import {Home} from '../components/Home'
import { GetServerSideProps } from 'next'
import axios from 'axios'

interface Props
{data: {
  count: number,
  resPerPage: number,
  jobs: [{
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
  }]
}
}

const Index: NextPage<Props> = ({data}) => {



  return (

    <Layout title={'Portal de trabajos - Encuentra ahora tu nuevo empleo!'}  >
      <Home data={data}/>
    </Layout>
  )
}

export default Index





 export const getServerSideProps: GetServerSideProps = async ({query}) => {

  const jobType = query.jobType || ''
  const education = query.education || ''
  const experience = query.experience || ''
  const keyword = query.keyword || ''
  const location = query.location || ''
  const page = query.page || 1

  let min_salary = ''
  let max_salary = ''

  if(query.salary){
    const salary = query.salary || ''

    const [min, max] = salary.toString().split('-')
    min_salary = min
    max_salary = max
  }




  const queryStr  = `keyword=${keyword}&location=${location}&page=${page}&jobType=${jobType}
  &education=${education}&experience=${experience}&min_salary=${min_salary}&max_salary=${max_salary}`

  



  const { data } = await  axios.get(`${process.env.API_URL}/api/jobs?${queryStr}`)




   return {
     props: {
       data
     }
   }
 }

