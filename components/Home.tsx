import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC, useContext, useEffect } from "react";
import Filters from './layout/Filters';
import JobItem from "./job/JobItem";
import Pagination from 'react-js-pagination'
import { AuthContext } from "../context/AuthContext";
import MediaQuery from 'react-responsive'



interface Props {
  data:{
    count: number,
    resPerPage: number,
    jobs: [ {
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

export const Home:FC<Props> = ({data}) => {



  const {jobs,count,resPerPage} = data
  const router = useRouter()



  let {page = 1 ,  keyword } = router.query

  let queryParams:any
  if (typeof window !=='undefined'){
    queryParams = new URLSearchParams(window.location.search)
  }




  const onHandlerPagesClick = (currentPage:any) =>{


    if(queryParams.has('page')){
      queryParams.set('page', currentPage)
    }else {
      queryParams.append('page', currentPage)
    }

    router.push({
      search:queryParams.toString()
    })

  }





  return (
    <>
      <div className="container container-fluid">
        <div className="row">
          <div className="col-xl-3 col-lg-4">
           <Filters/>
          </div>

          <div className="col-xl-9 col-lg-8 content-left-offset">
            <div className="my-5">
              <h4 className="page-title">{keyword ?
                  `${jobs.length} Resultado de ${keyword}`
                :"Ultimos trabajos"}</h4>
              <MediaQuery minWidth={1224}>
              <Link href="/stats">
                <button className="btn btn-secondary float-right stats_btn"
                >

                  Ver estadisticas
                </button>
              </Link>
              </MediaQuery>
              <div className="d-block">
                <Link href="/search">Ir al buscador</Link>
              </div>
            </div>
            {jobs && jobs.map((job)=> <JobItem  key = {job.id} job={job} /> )}
                {resPerPage < count && (
                  <Pagination
                  activePage={Number(page)}
                  itemsCountPerPage={resPerPage}
                  totalItemsCount={count}
                  onChange={onHandlerPagesClick}
                  nextPageText={'Next'}
                  prevPageText={'Prev'}
                  firstPageText={'First'}
                  lastPageText = {'Last'}
                  itemClass ='page-item'
                  linkClass="page-link"

                  />
                )}

          </div>
        </div>
      </div>
    </>
  );
};

