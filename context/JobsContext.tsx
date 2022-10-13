import axios from "axios";
import { useRouter } from "next/router";
import { createContext, FC, useContext, useEffect, useState } from "react";


interface ContextProps {
    loading: boolean;

    error: any;
    updated:boolean;
    uploader:boolean;
    applied:boolean
    statics:any;
    created:boolean
    deleted:any;


    applyToJob:(id:number, access_token:string) => void;
    clearError:() => void;

    checkJobsApplied:(id:number, access_token:string) => void;
    NewJob:(data:any, access_token:string) => void;
    getTopicStats:(topic:string) => void;
    setCreated:(value: boolean) => void;
    updateJobs:(id:number,data:any, access_token:string) => void;
    setUpdated:(value: boolean) => void;
    deleteJob:(id:number,access_token:string) => void;
    setDeleted:(value: any) => void;


}


export const JobsContext = createContext({} as ContextProps)

interface Props {
    children:JSX.Element
}

export const JobsProvider:FC<Props> = ({children}) => {

    const [loading, setLoading] = useState(false)
    const [updated, setUpdated] = useState(false)
    const [error, setError] = useState(null)
    const [uploader, setUploader] = useState(false)
    const [applied, setApplied] = useState(false)
    const [statics, setStatics] = useState(false)
    const [created, setCreated] = useState(false)
    const [deleted, setDeleted] = useState(false)


    const NewJob = async (data:any, access_token:string) => {
      try {
        setLoading(true);

        const res = await axios.post(
          `${process.env.API_URL}/api/jobs/new/`,
          data,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );

        if (res.data) {
          setLoading(false);
          setCreated(true);
        }
      } catch (error:any) {
        setLoading(false);
        setError(
          error.response &&
            (error.response.data.detail || error.response.data.error)
        );
      }
    };


    const applyToJob = async (id:number, access_token:string) => {
        try {
          setLoading(true);

          const res = await axios.post(
            `${process.env.API_URL}/api/jobs/${id}/apply/`,
            {},
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          );

          if (res.data.applied === true) {
            setLoading(false);
            setApplied(true);
          }
        } catch (error:any) {
          setLoading(false);
          setError(
            error.response &&
              (error.response.data.detail || error.response.data.error)
          );
        }
      };

  const updateJobs = async (id:number,data:any, access_token:string) => {
        try {
          setLoading(true);

          const res = await axios.put(
            `${process.env.API_URL}/api/jobs/${id}/update/`,
            data,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          );

          if (res.data) {
            setLoading(false);
            setUpdated(true);
          }
        } catch (error:any) {
          setLoading(false);
          setError(
            error.response &&
              (error.response.data.detail || error.response.data.error)
          );
        }
      };
const checkJobsApplied = async (id:number, access_token:string) => {
        try {
          setLoading(true);

          const res = await axios.get(
            `${process.env.API_URL}/api/jobs/${id}/check/`,
            {
              headers: {
                Authorization: `Bearer ${access_token}`,
              },
            }
          );

          if (res.data.applied) {
            setLoading(false);
            setApplied(true);
          }else{
            setLoading(false);
            setApplied(false)
          }
        } catch (error:any) {
          setLoading(false);
          setError(
            error.response &&
              (error.response.data.detail || error.response.data.error)
          );
        }
      };
    const getTopicStats = async (topic:string) => {
        try {
          setLoading(true);

          const res = await axios.get(
            `${process.env.API_URL}/api/stats/${topic}/`,

          );

          if (res.data) {
            setLoading(false);
            setStatics(res.data);
          }else{
            setLoading(false);

          }
        } catch (error:any) {
          setLoading(false);
          setError(
            error.response &&
              (error.response.data.detail || error.response.data.error)
          );
        }
      };
    const clearError = () =>{
        setError(null)
    }

    const deleteJob = async (id:number, access_token:string) => {
      try {
        setLoading(true);

        const res = await axios.delete(
          `${process.env.API_URL}/api/jobs/${id}/delete/`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          }
        );


          setLoading(false);
          setDeleted(true);

      } catch (error:any) {
        setLoading(false);
        setError(
          error.response &&
            (error.response.data.detail || error.response.data.error)
        );
      }
    };


    return (

        <JobsContext.Provider value={{

            loading,
            error,
            statics,
            applyToJob,
            applied,
            uploader,
            updated,
            NewJob,
            created,
            setCreated,
            clearError,
            checkJobsApplied,
            getTopicStats,
            updateJobs,
            setUpdated,
            deleted,
            deleteJob,
            setDeleted



        }}>
            {children}
        </JobsContext.Provider>

      )
    }