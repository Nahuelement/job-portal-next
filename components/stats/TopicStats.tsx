
import Link from 'next/link'
import { useRouter } from 'next/router'
import { userAgent } from 'next/server'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { JobsContext } from '../../context/JobsContext';
import { Loader } from '../layout'

export const TopicStats = () => {


    const [topic, setTopic] = useState('')
    const { getTopicStats,statics, clearError, error, loading} = useContext(JobsContext)


    useEffect(() => {
      if(error){
        toast.error(error)
        clearError()
      }
    }, [error])

    const submitHandler = (e:any) =>{
        e.preventDefault()
        getTopicStats(topic)

    }


    return (
        <div className="modalMask">
          <div className="modalWrapper">
            <div className="left">
              <div className="rightContentWrapper">
                <div className="headerWrapper">
                  <h3> Get Topic Stats </h3>
                </div>
                <form className="form" onSubmit={submitHandler}>
                  <div className="inputWrapper">
                    <div className="inputBox">
                      <i aria-hidden className="fas fa-chart-line"></i>
                      <input
                      type="text"
                      placeholder="Enter Your Topic"
                      required
                      value={topic}
                      onChange={({target})=>setTopic(target.value)}
                      />
                    </div>
                  </div>

                  <div className="uploadButtonWrapper">
                    <button type="submit" className="uploadButton">
                      {loading ? "Fetching...":"Get stats"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="right">
              <div className="rightContentWrapper">

                { loading ? (
                    <Loader/>
                ):
                (
                    statics && statics.message ?(
                        <div className='alert alert-danger'>
                            <b>{statics.message}</b>
                        </div>
                    ):
                    statics &&
                    <>
                    <h4>Stats of {topic.toUpperCase()}:</h4>
                    <table className="table table-striped mt-4">
                      <tbody>
                        <tr>
                          <th scope="row">Average Positions</th>
                          <td>{statics.avg_positions}</td>
                        </tr>
                        <tr>
                          <th scope="row">Total Jobs</th>
                          <td> {statics.total_jobs}</td>
                        </tr>
                        <tr>
                          <th scope="row">Minimum Salary</th>
                          <td>$ {statics.min_salary}</td>
                        </tr>
                        <tr>
                          <th scope="row">Maximum Salary</th>
                          <td>$ {statics.max_salary}</td>
                        </tr>
                        <tr>
                          <th scope="row">Average Salary</th>
                          <td>$ {statics.avg_salary}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="alert alert-danger mt-4">
                        <b>Note:</b> These stats are collected from the jobs that are
                        posted only on Jobbee. Do not compare these stats with other
                        sites.
                    </div>
                    </>
                )
            }



              </div>
            </div>
          </div>
        </div>
      );
}
