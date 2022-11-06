import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";



interface Props {
  access_token:string
}


export const UpdateProfile:FC<Props> = ({access_token}) => {



    const [fistName, setFistName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [sentError, setsentError] = useState(true)

    const [password, setPassword] = useState('')

    //UI state

    const router = useRouter()

    const {loading,error:errors, isAuthenticated,user,initError,updateProfile,update,setUpdate} = useContext(AuthContext)



    const submitHabdler = (e:React.FormEvent<HTMLFormElement>)=> {
        e.preventDefault()

         updateProfile(fistName,lastName,email,password, access_token)

    }

    useEffect(() => {

        if(user){
            setFistName(user.first_name)
            setLastName(user.last_name)
            setEmail(user.email)
        }

        if(errors){
            let {error=''}= errors
            if(error!=='' && sentError){
                toast.error(error)
                setsentError(false)
            }

        }
        if(update){
          setUpdate(false)
          router.push('/me')

        }




    }, [loading,errors,update])







return (
    <div className="modalMask">
      <div className="modalWrapper">
        <div className="left">
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <Image src="/images/profile.svg" alt="register" layout='fill'/>
          </div>
        </div>
        <div className="right">
          <div className="rightContentWrapper">
            <div className="headerWrapper">
              <h2> Perfil </h2>
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
                   placeholder="Ingresar tu email"
                   required
                   value={email}
                   onChange={({target})=>setEmail(target.value)}


                   />
                </div>
                <div className="inputBox">
                  <i aria-hidden className="fas fa-key"></i>
                  <input
                    type="password"
                    placeholder="Ingresar tu contraseña"
                    value={password}
                   onChange={({target})=>setPassword(target.value)}

                  />
                </div>
              </div>
              <div className="registerButtonWrapper">
                <button type="submit" className="registerButton">
                  {loading ? "Actualizando...":"Actualizar"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

