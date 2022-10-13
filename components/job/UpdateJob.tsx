import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { JobsContext } from '../../context/JobsContext';
import { useRouter } from 'next/router';
import { educationOptions,
         experienceOptions,
         industriesOptions,
         jobTypeOptions } from './data';

export const UpdateJob = ({access_token, job}:{access_token:string, job:any}) => {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [email, setemail] = useState('')
    const [address, setAddress] = useState('')
    const [jobType, setJobType] = useState('Permanet')
    const [education, setEducation] = useState('Bachelors')
    const [industry, setIndustry] = useState('Business')
    const [experience, setExperience] = useState('No experience')
    const [salary, setSalary] = useState('')
    const [positions, setPosition] = useState('')
    const [company, setCompany] = useState('')


    const router = useRouter()




    const {updateJobs,clearError,updated, error, loading, setUpdated} = useContext(JobsContext)

    useEffect(() => {

        if(job){
            setTitle(job.title)
            setDescription(job.description)
            setemail(job.email)
            setAddress(job.address)
            setJobType(job.jobType)
            setEducation(job.education)
            setIndustry(job.industry)
            setExperience(job.experience)
            setSalary(job.salary)
            setPosition(job.positions)
            setCompany(job.company)

        }

        if(error){
            toast.error(error)
        }

        if(updated){
            setUpdated(false)
            toast.success('Actualizado correctamente')
            router.push('/employeer/jobs')
        }

    }, [error,updated])


    const submitHandler = (e:any)=>{
        e.preventDefault()


        const data = {
            title,
            description,
            email,
            address,
            jobType,
            education,
            industry,
            experience,
            salary,
            positions,
            company
        }

        updateJobs(job.id,data, access_token)
    }


    return (
        <div className="newJobcontainer">
          <div className="formWrapper">
            <div className="headerWrapper">
              <div className="headerLogoWrapper"></div>
              <h1>
                <i aria-hidden className="fas fa-copy mr-2"></i> Actualizar ofertas de trabajo
              </h1>
            </div>
            <form className="form" onSubmit={submitHandler}>
              <div className="row">
                <div className="col-12 col-md-6">
                  <div className="inputWrapper">
                    <div className="inputBox">
                      <i aria-hidden className="fab fa-tumblr"></i>
                      <input
                      value={title}
                      onChange={({target})=>setTitle(target.value)}
                      type="text" placeholder="Enter Job Title" required />
                    </div>
                    <div className="inputBox">
                      <i aria-hidden className="fas fa-file-medical-alt"></i>
                      <textarea
                        className="description"
                        value={description}
                        onChange={({target})=>setDescription(target.value)}

                        placeholder="Enter Job Description"
                        required
                      />
                    </div>
                    <div className="inputBox">
                      <i aria-hidden className="fas fa-envelope"></i>
                      <input
                        type="email"
                        value={email}
                        onChange={({target})=>setemail(target.value)}

                        placeholder="Enter Your Email"
                        pattern="\S+@\S+\.\S+"
                        title="Your email is invalid"
                        required
                      />
                    </div>
                    <div className="inputBox">
                      <i aria-hidden className="fas fa-map-marker-alt"></i>
                      <input
                      value={address}
                      onChange={({target})=>setAddress(target.value)}
                      type="text" placeholder="Enter Address" required />
                    </div>
                    <div className="inputBox">
                      <i aria-hidden className="fas fa-dollar-sign"></i>
                      <input
                        type="number"
                        value={salary}
                        onChange={({target})=>setSalary(target.value)}
                        placeholder="Enter Salary Range"
                        required
                      />
                    </div>
                    <div className="inputBox">
                      <i aria-hidden className="fas fa-users"></i>
                      <input
                        type="number"
                        value={positions}
                        onChange={({target})=>setPosition(target.value)}
                        placeholder="Enter No. of Positions"
                        required
                      />
                    </div>
                    <div className="inputBox">
                      <i aria-hidden className="fas fa-building"></i>
                      <input
                        value={company}
                        onChange={({target})=>setCompany(target.value)}
                        type="text"
                        placeholder="Enter Company Name"
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="col-12 col-md-6 ml-4 mt-4 mt-md-0 ml-md-0">
                  <div className="boxWrapper">
                    <h4>Job Types:</h4>
                    <div className="selectWrapper">
                      <select
                      className="classic"
                      value={jobType}
                      onChange={({target})=>setJobType(target.value)}
                      >
                          {jobTypeOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                      </select>
                    </div>
                  </div>

                  <div className="boxWrapper">
                    <h4>Education:</h4>
                    <div className="selectWrapper">
                      <select className="classic"
                      value={education}
                     onChange={({target})=>setEducation(target.value)}
                      >
                {educationOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                      </select>
                    </div>
                  </div>

                  <div className="boxWrapper">
                    <h4>Industry:</h4>
                    <div className="selectWrapper">
                      <select className="classic"
                        value={industry}
                       onChange={({target})=>setIndustry(target.value)}
                      >
                     {industriesOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                      </select>
                    </div>
                  </div>

                  <div className="boxWrapper">
                    <h4>Experience:</h4>
                    <div className="selectWrapper">
                      <select
                      value={experience}
                      onChange={({target})=>setExperience(target.value)}
                      className="classic">
                        {experienceOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                      </select>
                    </div>
                  </div>
                </div>

                <div className="col text-center mt-3">
                  <button className="createButton">{loading? 'Actualizando...':'Actualizar trabajo'} </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      );
    };

