import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { userAgent } from 'next/server'
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { AuthContext } from '../../context/AuthContext'

export const UpLoadResume = ({access_token}:{access_token:string}) => {

    const [resume  , setResume] = useState(null)

    //UI state

    const router = useRouter()

    const {loading,user,error:errors,initError,updateResume,uploader,setUploader} = useContext(AuthContext)



    const submitHabdler = (e:React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault()

        const formData = new FormData()
        formData.append('resume', resume!)

        updateResume(formData, access_token)
    }

    const onChange = (e:any)=>{
        setResume(e.target.files[0])

    }

    useEffect(() => {

        if(uploader){
            setUploader(false)
            toast.success('tu CV subido correctamente')
        }

        if(errors as any){

                toast.error(errors)
                initError()
            }






    }, [loading,errors,uploader])



  return (
    <div className="modalMask">
      <div className="modalWrapper">
        <div className="left">
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <Image src="/images/resume-upload.svg" alt="resume" layout='fill' />
          </div>
        </div>
        <div className="right">
          <div className="rightContentWrapper">
            <div className="headerWrapper">
              <h3> UPLOAD RESUME </h3>
            </div>
            <form className="form" onSubmit={submitHabdler}>
              <div className="inputWrapper">
                <div className="inputBox">
                  <i aria-hidden className="fas fa-upload"></i>
                  <input
                    type="file"
                    name="resume"
                    id="customFile"
                    accept="application/pdf"
                    onChange= {onChange}
                    required
                  />
                </div>
              </div>
              {
                user && user.resume &&(

                    <>
                    <h4 className="text-center my-3">OR</h4>

                    <Link href={`${user.resume}`}>
                      <a
                        className="text-success text-center ml-4"
                        rel="noreferrer"
                        target="_blank"
                      >
                        <b>
                          <i aria-hidden className="fas fa-download"></i> Download
                          Your Resume
                        </b>
                      </a>
                    </Link>
                  </>

                )
              }


              <div className="uploadButtonWrapper">
                <button type="submit" className="uploadButton">
                  {loading ? 'Uploading ...':'upload'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
