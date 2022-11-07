import Link from 'next/link'
import React, { FC } from 'react'
import DataTable from 'react-data-table-component'



interface Props{
    jobs:any
}

export const JobApplied:FC<Props> = ({jobs}) => {

    const columns = [
        {
            name:'Trabajo',
            sortable:true,
            selector:(row:any)=> row.title
        },
        {
            name:'Sueldo',
            sortable:true,
            selector:(row:any)=> row.salary
        },
        {
            name:'Educacion',
            sortable:true,
            selector:(row:any)=> row.education
        },
        {
            name:'Experiencia',
            sortable:true,
            selector:(row:any)=> row.experience
        },
        {
            name:'Dia que aplico',
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
            <Link href={`/jobs/${job.job.id}/`}>
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
