import axios from "axios"
import { GetServerSideProps, NextPage } from "next"
import { useState } from "react"
import { Layout } from "../components/layout"
import Search from "../components/layout/Search"




const Index: NextPage = () => {


    return (

      <Layout title={'Busca tu nuevo empleo'}  >
            <Search />
      </Layout>
    )
  }

  export default Index


  // You should use getServerSideProps when:
  // - Only if you need to pre-render a page whose data must be fetched at request time

