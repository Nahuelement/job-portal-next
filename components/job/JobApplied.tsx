import Link from 'next/link'
import React, { FC } from 'react'
import DataTable from 'react-data-table-component'



interface Props{
    jobs:any
}

export const JobApplied:FC<Props> = ({jobs}) => {

    const columns = [
        {
            name:'Job name',
            sortable:true,
            selector:(row:any)=> row.title
        },
        {
            name:'Salary',
            sortable:true,
            selector:(row:any)=> row.salary
        },
        {
            name:'Education',
            sortable:true,
            selector:(row:any)=> row.education
        },
        {
            name:'Experience',
            sortable:true,
            selector:(row:any)=> row.experience
        },
        {
            name:'Applied On',
            sortable:true,
            selector:(row:any)=> row.applieOn
        },
        {
            name:'Action',
            sortable:true,
            selector:(row:any)=> row.action
        },
    ]

console.log(jobs)

const data:any = []
jobs && jobs.forEach((job:any) =>{
    data.push({
        title:job.job.title,
        salary: job.job.salary,
        education: job.job.education,
        experience:job.job.experience,
        applieOn: job.appliedAt.substring(0,10),
        action :(
            <Link href={`/job/${job.job.id}/`}>
                < a href='' className='btn btn-primary'>
                    < i aria-hidden className='fa fa-eye'></i>
                </a>
            </Link>
        )
    })
})

console.log(data)

  return (
    <div className='row'>
        <div className='col-2'>

        </div>
        <div className='col-8 mt-5'>
            <DataTable columns={columns} data = {data} pagination responsive/>
        </div>
        <div className='col-2'>

        </div>
    </div>
  )
}
