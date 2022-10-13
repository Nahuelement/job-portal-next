import axios from "axios";
import { useRouter } from "next/router";
import { createContext, FC, useContext, useEffect, useState } from "react";


interface ContextProps {
    loading: boolean;
    user: any | null;
    isAuthenticated: boolean;
    error: any;
    update:boolean;
    uploader:boolean;

    login: (username:any, password: any) => void;
    initError:() => void;
    logout :() => void;
    register:(firstName:string, lastName:string, email:string, password:string) => void;
    updateProfile:(firstName:string, lastName:string, email:string, password:string, access_token:string) => void;
    setUpdate:(value: boolean) => void;
    updateResume:(formData:any,access_token:string) => void;
    setUploader:(value: boolean) => void;

}


export const AuthContext = createContext({} as ContextProps)

interface Props {
    children:JSX.Element
}

export const AuthProvider:FC<Props> = ({children}) => {

    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [update, setUpdate] = useState(false)
    const [error, setError] = useState(null)
    const [uploader, setUploader] = useState(false)


    const router = useRouter()

    const initError = () =>{
        setError(null)
    }

    useEffect(()=>{
        if(!user){
            loadUser()
        }


    },[user])


    const login = async(username:string, password:string) =>{
        try {

            setLoading(true)

            const res = await axios.post('/api/auth/login',{
                username,
                password
            })

            if(res.data.success){
                loadUser()
                setError(null)
                setIsAuthenticated(true)
                setLoading(false)
                // router.push('/')
            }
            }
      catch (error:any) {
                setLoading(false);
                setError(
                  error.response.data.error
                );

          } }

     const loadUser =async() =>{
            try {

                setLoading(true)

                const res = await axios.get('/api/auth/user')

                if(res.data.user){
                    setIsAuthenticated(true)
                    setLoading(false)
                    setUser(res.data.user)

                }
                }
            catch(error:any) {

                    setLoading(false)
                    setIsAuthenticated(false)
                    setUser(null)
                    setError(
                        error.response &&
                          (error.response.data.detail || error.response.data.error)
                      );
                } }


    const register =async(firstName:string, lastName:string, email:string, password:string) =>{
                    try {
                        setLoading(true);

                        const res = await axios.post(`${process.env.API_URL}/api/register/`, {
                          first_name: firstName,
                          last_name: lastName,
                          email,
                          password,
                        });
                        console.log(res.data.message
                            )
                        if (res.data.message) {
                          setLoading(false);
                          router.push("/login");
                        }}
                    catch(error:any) {

                            setLoading(false)
                            setIsAuthenticated(false)
                            setUser(null)

                                setError(
                                    error.response &&
                                      (error.response.data.detail || error.response.data.error)
                                  );
                            } }

        const updateProfile =async(firstName:string, lastName:string, email:string, password:string, access_token:string) =>{
                        try {
                            setLoading(true);

                            const res = await axios.put(
                                `${process.env.API_URL}/api/me/update/`,
                                {
                                  first_name: firstName,
                                  last_name: lastName,
                                  email,
                                  password,
                                },
                                {
                                  headers: {
                                    Authorization: `Bearer ${access_token}`,
                                  },
                                }
                              );

                            if (res.data) {
                              setLoading(false);
                              setUser(res.data);
                              setUpdate(true)
                            }}
                        catch(error:any) {

                                setLoading(false)
                                setIsAuthenticated(false)
                                setUser(null)
                                setError(
                                    error.response &&
                                      (error.response.data.detail || error.response.data.error)
                                  );
                           } }

        const updateResume =async(formData:any, access_token:string) =>{
                            try {
                                setLoading(true);

                                const res = await axios.put(
                                    `${process.env.API_URL}/api/upload/resume/`,
                                    formData,
                                    {
                                      headers: {
                                        Authorization: `Bearer ${access_token}`,
                                      },
                                    }
                                  );

                                if (res.data) {
                                  setLoading(false);

                                  setUploader(true)
                                }}
                            catch(error:any) {

                                    setLoading(false)
                                    setIsAuthenticated(false)
                                    setUser(null)
                                    setError(
                                        error.response &&
                                          (error.response.data.detail || error.response.data.error)
                                      );
                              } }

    const  logout =async() =>{
                try {


                    const res = await axios.get('/api/auth/logout')

                    if(res.data.success){
                        setIsAuthenticated(false)
                        setUser(null)

                    }
                    }
                catch(error:any) {

                        setLoading(false)
                        setIsAuthenticated(false)
                        setUser(null)
                        setError(
                            error.response &&
                              (error.response.data.detail || error.response.data.error)
                          )
                  } }



  return (

    <AuthContext.Provider value={{

        loading,
        user,
        isAuthenticated,
        error,
        update,
        uploader,
        login,
        initError,
        logout,
        register,
        updateProfile,
        setUpdate,
        setUploader,
        updateResume,


    }}>
        {children}
    </AuthContext.Provider>

  )
}
