import NotFound from "../components/layout/NotFound";

import React from 'react'
import { NextPage } from "next";

import { Layout } from "../components/layout";

const NotFoundPage:NextPage = () => {
  return (

  <Layout title={"Page Not Found "} >
  <NotFound/>
  </Layout>
  )
}

export default NotFoundPage