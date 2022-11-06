import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';

export const Register = () => {



        const [fistName, setFistName] = useState('')
        const [lastName, setLastName] = useState('')
        const [email, setEmail] = useState('')
        const [password, setPassword] = useState('')

        //UI state
        const [sentError, setsentError] = useState(true)

        const router = useRouter()

        const {loading,error:errors, isAuthenticated,login,initError,register} = useContext(AuthContext)




        useEffect(() => {

            if(errors){
                let {error=''}= errors
                if(error!=='' && sentError){
                    toast.error(error)
                    setsentError(false)
                }

            }

            if(isAuthenticated && !loading){
                router.push('/login')

            }


        }, [loading,errors,isAuthenticated])

        const submitHabdler = async(e:React.FormEvent<HTMLFormElement>)=> {
          e.preventDefault()

          await register(fistName,lastName,email,password)
          router.push(`/${errors?'register':'login'}`)

      }






    return (
        <div className="modalMask">
          <div className="modalWrapper">
            <div className="left">
              <div style={{ width: "100%", height: "100%", position: "relative" }}>
                <Image src="/images/signup.svg" alt="register" layout='fill'/>
              </div>
            </div>
            <div className="right">
              <div className="rightContentWrapper">
                <div className="headerWrapper">
                  <h2> Crear cuenta </h2>
                </div>
                <form className="form" onSubmit={submitHabdler}>
                  <div className="inputWrapper">
                    <div className="inputBox">
                      <i aria-hidden className="fas fa-user"></i>
                      <input
                       type="text"
                       placeholder="Ingresar nombre"
                       required
                       value={fistName}
                       onChange={({target})=>setFistName(target.value)}

                       />
                    </div>


                    <div className="inputBox">
                      <i aria-hidden className="fas fa-user-tie"></i>
                      <input
                      type="text"
                      placeholder="Ingresar apellido"
                      required
                      value={lastName}
                      onChange={({target})=>setLastName(target.value)}

                      />
                    </div>

                    <div className="inputBox">
                      <i aria-hidden className="fas fa-envelope"></i>
                      <input
                       type="email"
                       placeholder="Ingresar email"
                       required
                       value={email}
                       onChange={({target})=>setEmail(target.value)}


                       />
                    </div>
                    <div className="inputBox">
                      <i aria-hidden className="fas fa-key"></i>
                      <input
                        type="password"
                        placeholder="Ingresar tu password"
                        required
                        value={password}
                       onChange={({target})=>setPassword(target.value)}

                      />
                    </div>
                  </div>
                  <div className="registerButtonWrapper">
                    <button type="submit" className="registerButton">
                      {loading ? "Cargando...":"Registrarme "}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    };

