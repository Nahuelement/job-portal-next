import Image from 'next/image';
import Link from 'next/link';
import React, { FC, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';

export const Header:FC = () => {


 const {loading, user,logout} = useContext(AuthContext)


    return (
      <div className="navWrapper">
        <div className="navContainer">
          <Link href="/">
            <div className="logoWrapper">
              <div className="logoImgWrapper">
                <Image width="50" height="50" src="/images/logo.png" alt="" />
              </div>
              <span className="logo1">Traba</span>
              <span className="logo2">jos</span>
            </div>
          </Link>
          <div className="btnsWrapper">
            <Link href="/employeer/jobs/new">
              <button className="postAJobButton">
                <span>Anunciar</span>
              </button>
            </Link>
            {
              user ?

              <div className=' dropdown-ml-3'>
                <a className='btn dropdown-toggle mr-4'
                id='dropDownMenuButton'
                data-toggle = 'dropdown'
                aria-haspopup= 'true'
                aria-expanded = 'false'
                >
                  <span> Hi, {user.first_name}</span>{" "}
                </a>

                <div
                className='dropdown-menu'
                aria-labelledby='dropDownMenuButton'
                >
                  <Link href="/employeer/jobs">
                  <button className="dropdown-item">
                    <span>Mis trabajos</span>
                  </button>
                  </Link>
                  <Link href="/me/applied">
                  <button className="dropdown-item">
                    <span>Trabajos aplicados</span>
                  </button>
                  </Link>
                  <Link href="/me">
                  <button className="dropdown-item">
                    <span>Perfil</span>
                  </button>
                  </Link>
                  <Link href="/upload/resume">
                  <button className="dropdown-item">
                    <span>Subir curriculum</span>
                  </button>
                  </Link>
                  <Link href="/">
                  <button
                  onClick={()=>logout()}
                   className="dropdown-item text-danger">
                    <span>Salir</span>
                  </button>
                  </Link>


                </div>
              </div>
              :
              !loading && (
                  <Link href="/login">
                  <button className="loginButtonHeader">
                    <span>Ingresar</span>
                  </button>
            </Link>
              )

            }


          </div>
        </div>
      </div>
    );
  };
