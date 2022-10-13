import { NextPage } from "next"
import { Register } from "../components/auth/Register"

import { Layout } from "../components/layout"



const Index: NextPage = () => {


    return (

      <Layout title={'NahuelJob - Login'}  >
            <Register />
      </Layout>
    )
  }

  export default Index