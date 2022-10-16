import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext';
import { toast } from 'react-toastify';
import Link from 'next/link';


export const Login = () => {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const { loading, error, isAuthenticated, login, initError } =
    useContext(AuthContext);


  useEffect(() => {
    if (error) {
      toast.error(error);
      initError();
    }

    if (isAuthenticated && !loading) {
      router.push("/");
    }


  }, [isAuthenticated, error, loading]);





  const submitHandler = async(e:any) => {
    e.preventDefault();
    await login( email, password );
  };


  return (
        <div className="modalMask">
          <div className="modalWrapper">
            <div className="left">
              <div style={{ width: "100%", height: "100%", position: "relative" }}>
                <Image src="/images/login.svg" alt="login" layout='fill' />
              </div>
            </div>
            <div className="right">
              <div className="rightContentWrapper">
                <div className="headerWrapper">
                  <h2> Acceder</h2>
                </div>
                <form className="form" onSubmit={submitHandler}>
                  <div className="inputWrapper">
                    <div className="inputBox">
                      <i aria-hidden className="fas fa-envelope"></i>
                      <input
                      type="email"
                      value={email}
                      onChange={({target})=>setEmail(target.value)}

                      placeholder="Ingresa tu mail "
                      required />
                    </div>
                    <div className="inputBox">
                      <i aria-hidden className="fas fa-key"></i>
                      <input
                        type="password"
                        placeholder="Ingresa tu password"
                        required
                        value={password}
                        onChange={({target})=>setPassword(target.value)}
                      />
                    </div>
                  </div>
                  <div className="loginButtonWrapper">
                    <button type="submit" className="loginButton">
                      {loading ? 'Loading': 'Ingresar'}
                    </button>
                  </div>
                  <p style={{ textDecoration: "none" }} className="signup">
                    Eres nuevo? <Link href="/register">crea una cuenta</Link>
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    };

    export default Login;