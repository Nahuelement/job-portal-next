
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
                  <h3> Estadisticas </h3>
                </div>
                <form className="form" onSubmit={submitHandler}>
                  <div className="inputWrapper">
                    <div className="inputBox">
                      <i aria-hidden className="fas fa-chart-line"></i>
                      <input
                      type="text"
                      placeholder="Ingresa palabra clave"
                      required
                      value={topic}
                      onChange={({target})=>setTopic(target.value)}
                      />
                    </div>
                  </div>

                  <div className="uploadButtonWrapper">
                    <button type="submit" className="uploadButton">
                      {loading ? "Buscando...":"Buscar"}
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
                    <h4>{topic.toUpperCase()}</h4>
                    <table className="table table-striped mt-4">
                      <tbody>
                        <tr>
                          <th scope="row">Promedio</th>
                          <td>{statics.avg_positions}</td>
                        </tr>
                        <tr>
                          <th scope="row">Total trabajos</th>
                          <td> {statics.total_jobs}</td>
                        </tr>
                        <tr>
                          <th scope="row">Salario minimo</th>
                          <td>$ {statics.min_salary}</td>
                        </tr>
                        <tr>
                          <th scope="row">Salario maximo</th>
                          <td>$ {statics.max_salary}</td>
                        </tr>
                        <tr>
                          <th scope="row">Promedio salario</th>
                          <td>$ {statics.avg_salary}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="alert alert-danger mt-4">
                        <b>Nota:</b> Estos valores solo reprentan las estadisticas de esta pagina demo.
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
