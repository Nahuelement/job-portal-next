import React, { useEffect, useContext, useState } from "react";

import Link from "next/link";
import DataTable from "react-data-table-component";


import { toast } from "react-toastify";

import { useRouter } from "next/router";
import { JobsContext } from "../../context/JobsContext";
import useSWR from "swr";
import axios from "axios";

const MyJobs = ({ access_token }:{access_token:string}) => {

  const router = useRouter()

  const fetcher = (url:any, token:any) =>
  axios
    .get(url, { headers: { Authorization: "Bearer " + token } })
    .then((res) => res.data);





  const res = useSWR<any>(
    [`${process.env.API_URL}/api/me/jobs/`,access_token],
    fetcher
  );
  const jobs = res.data ;

  const { clearError, error, loading ,deleteJob,deleted, setDeleted } =useContext(JobsContext);



  useEffect(() => {
    if (error) {
      toast.error(error);
      clearError();
    }

     if (deleted) {
       setDeleted(false);
       router.reload()
       }

  }, [error,deleted]);


   const deleteJobHandler = (id:any) => {
     deleteJob(id, access_token);

   };

  const columns = [
    {
      name: "ID trabajo",
      sortable: true,
      selector: (row:any) => row.id,
    },
    {
      name: "Trabajo",
      sortable: true,
      selector: (row:any) => row.title,
    },
    {
      name: "Salario",
      sortable: true,
      selector: (row:any) => row.salary,
    },
    {
      name: "Action",
      sortable: true,
      selector: (row:any) => row.action,
    },
  ];


  const data:any = []
  jobs && jobs.forEach((job:any) =>{
      data.push({
          id:job.id,
          title:job.title,
          salary: job.salary,
          education: job.salary,

          action :(
            <div style={{display:'block'}}>
              <Link href={`/jobs/${job.id}`}>
                <a className="btn btn-primary">
                  <i aria-hidden className="fa fa-eye"></i>
                </a>
              </Link>
              <Link href={`/employeer/jobs/candidates/${job.id}`}>
                <a className="btn btn-success my-2 mx-1">
                  <i aria-hidden className="fa fa-users"></i>
                </a>
              </Link>
              <Link href={`/employeer/jobs/${job.id}`}>
                <a className="btn btn-warning my-2 mx-1">
                  <i aria-hidden className="fa fa-pencil"></i>
                </a>
              </Link>
              <button
                className="btn btn-danger mx-1"
                onClick={() => deleteJobHandler(job.id)}

              >
              <i className="fa fa-trash"></i>
              </button>
            </div>
          ),
        });
      });






  return (
    <div className="row">
      <div className="col-2"></div>
      <div className="col-9 mt-5">


          <h4 className="my-5">Mis trabajos</h4>
          <DataTable columns={columns} data={data} pagination responsive />

      </div>
      <div className="col-2"></div>
    </div>
  );
};

export default MyJobs;
