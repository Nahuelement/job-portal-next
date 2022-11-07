import moment from 'moment'
import React, { FC, useContext, useEffect, useState } from 'react'

import mapboxgl from 'mapbox-gl'
import { JobsContext } from '../../context/JobsContext'
import { toast } from 'react-toastify'
import { AuthContext } from '../../context/AuthContext'



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
    access_token:string,
}


mapboxgl.accessToken = process.env.MAPBOX_ACCES_TOKEN!

const JobDetails:FC<Props> = ({job, candidate,access_token}) => {

 const {applyToJob, applied, clearError, checkJobsApplied, error,loading} = useContext(JobsContext)
  const [stopError, setstopError] = useState(true)

const {user} = useContext(AuthContext)

console.log(user)

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0
})

if(!user){

}

  const getMap =async () => {

    const cooridinates = job.point.split("(")[1].replace(")", "").split(" ");

    const refCoordinate = cooridinates.map(str => {return Number(str);})
    const LngLat  = new mapboxgl.LngLat(refCoordinate[0],refCoordinate[1])
    // Create map and set the center point
     const map = new mapboxgl.Map({
       container: "job-map",
       style: "mapbox://styles/mapbox/streets-v11",
       center: LngLat,
       zoom: 15,
     });

    // Add market on map
     new mapboxgl.Marker().setLngLat(LngLat).addTo(map);

    // if (error) {
    //   toast.error(error);
    //   clearErrors();
    // }

    // checkJobApplied(job.id, access_token);
}







useEffect(()=>{
  if(error){
    toast.error(error)
    clearError()

    console.log(error)
  }
  getMap()



}, [error]);


  const ApplyJobHandler = () =>{

    applyToJob(job.id, access_token)
    checkJobsApplied(job.id, access_token)

  }


  const d1 = moment(job.lastDate)
  const d2 = moment(Date.now())

const lastDatePassed = d1.diff(d2, 'days') < 0

console.log(lastDatePassed)
  return (

        <div className="job-details-wrapper">
          <div className="container container-fluid">
            <div className="row">
              <div className="col-xl-9 col-lg-8">
                <div className="job-details p-3">
                  <div className="job-header p-4">
                    <h2>{job.title}</h2>
                    <span>
                      <i  className="fas fa-building"></i>
                      <span> {job.company}</span>
                    </span>
                    <span className="ml-4">
                      <i aria-hidden className="fas fa-map-marker-alt"></i>
                      <span> {job.address}</span>
                    </span>

                    <div className="mt-3">
                      <span>
                        {
                          loading ? (
                            'Loading...'
                          ): applied ? (

                            <button
                            disabled
                            className="btn btn-success px-4 py-2 apply-btn">
                            <i className='fas fa-check'>
                              {" "}
                            {loading? 'Cargando':'Postulando'}
                            </i>
                            </button>
                          ):
                          (

                            <button
                            className="btn btn-primary px-4 py-2 apply-btn"
                            onClick={ApplyJobHandler}
                            disabled={lastDatePassed || !user}
                            >
                            {loading? 'Cargar...':user?'Aplicar ahora':'Necesitas ingresar'}

                            </button>
                          )

                        }

                        <span className="ml-4 text-success">
                          <b>{candidate}</b> candidatos que han aplicado a este trabajo.
                        </span>
                      </span>
                    </div>
                  </div>

                  <div className="job-description mt-5">
                    <h4>Descripción</h4>
                    <p>
                    {job.description}
                    </p>
                  </div>

                  <div className="job-summary">
                    <h4 className="mt-5 mb-4">Resumen del trabajo</h4>
                    <table className="table table-striped">
                      <tbody>
                        <tr>
                          <td>Trabajo</td>
                          <td>:</td>
                          <td>{job.jobType}</td>
                        </tr>

                        <tr>
                          <td>Industria</td>
                          <td>:</td>
                          <td>{job.industry}</td>
                        </tr>

                        <tr>
                          <td>Salario</td>
                          <td>:</td>
                          <td>{formatter.format(job.salary)}</td>
                        </tr>

                        <tr>
                          <td>Educación</td>
                          <td>:</td>
                          <td>{job.education}</td>
                        </tr>

                        <tr>
                          <td>Experiencia </td>
                          <td>:</td>
                          <td>{job.experience}</td>
                        </tr>

                        <tr>
                          <td>Compañia</td>
                          <td>:</td>
                          <td>{job.company}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <div className="job-location">
                    <h4 className="mt-5 mb-4">Localización</h4>
                    <div id='job-map' style={{height:520, width:'80vw'}} />
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-lg-4">
                <div className="job-contact-details p-3">
                  <h4 className="my-4">Mas detalles</h4>
                  <hr />
                  <h5>Email:</h5>
                  <p>{job.email}</p>

                  <h5>Subido:</h5>
                  <p>{moment.utc(job.createdAt).local().startOf('seconds').fromNow()}</p>

                  <h5>Ultima actualización:</h5>
                  <p>{job.lastDate.substring(0,10)}</p>
                </div>

                <div className="mt-5 p-0">

                   {
                    lastDatePassed?
                    (
                    <div className="alert alert-danger">
                    <h5>Note:</h5>
                    no puedes postular a este trabajo porque expiro: <b>{job.lastDate.substring(0,10)}</b>
                    <br /> Busca otros trabajos en el portal.
                    </div>
                    ): null
                   }

                </div>
              </div>
            </div>
          </div>
        </div>
      );

}

export default JobDetails