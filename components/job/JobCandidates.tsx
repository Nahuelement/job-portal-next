import React, { useEffect, useContext, useState } from "react";

import Link from "next/link";
import DataTable from "react-data-table-component";


import { toast } from "react-toastify";

import { useRouter } from "next/router";
import { JobsContext } from "../../context/JobsContext";
import useSWR from "swr";
import axios from "axios";

const JobsCandidates = ({ access_token, id }:{access_token:any, id :number}) => {



   const fetcher = (url:any, token:any) =>
   axios
     .get(url, { headers: { Authorization: "Bearer " + token } })
     .then((res) => res.data);



   const res = useSWR<any>(
     [`${process.env.API_URL}/api/jobs/${id}/candidate/`,access_token],
     fetcher
   );


  const { clearError, error, loading  } =useContext(JobsContext);



  const candidatesApplied = res.data ;


  console.log(candidatesApplied)


//    const deleteJobHandler = (id) => {
  //   deleteJob(id, access_token);
  // };

  const columns = [
    {
      name: "Trabajo",
      sortable: true,
      selector: (row:any) => row.title,
    },
    {
      name: "Id Trabajo",
      sortable: true,
      selector: (row:any) => row.id,
    },
    {
      name: "Curriculum",
      sortable: true,
      selector: (row:any) => row.resume,
    },
    {
      name: "Dia de ingreso",
      sortable: true,
      selector: (row:any) => row.appliedAt,
    },
  ];



  const data:any = []
  candidatesApplied && candidatesApplied.candidate_jobs.forEach((item:any) =>{
      data.push({
          title:item.job.title,
          id: item.user,


          resume :(
            <>
              <Link href={`${item.resume}`}>
                      <a
                        className="text-success text-center ml-4"
                        rel="noreferrer"
                        target="_blank"
                      >
                        <b>
                          <i aria-hidden className="fas fa-download"></i> Descargar curriculum
                        </b>
                      </a>
             </Link>
            </>
          ),
          appliedAt: item.appliedAt.substring(0,10),
        });
      });




    useEffect(() => {
      if (error) {
        toast.error(error);
        clearError();
      }

      // if (deleted) {
      //   setDeleted(false);
      //   router.push(router.asPath);

    }, [error]);

  return (
    <div className="row">
      <div className="col-2"></div>
      <div className="col-8 mt-5">


          <h4 className="my-5">{candidatesApplied && ` Total ${candidatesApplied.candidate_jobs.length} estan postulando a este trabajo`}</h4>
          <DataTable columns={columns} data={data} pagination responsive />

      </div>
      <div className="col-2"></div>
    </div>
  );
};

export default JobsCandidates;
