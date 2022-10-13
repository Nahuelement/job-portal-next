import { NextPage } from "next"
import Login from "../components/auth/Login"
import { Layout } from "../components/layout"



const Index: NextPage = () => {


    return (

      <Layout title={'Ingresar'}  >
            <Login />
      </Layout>
    )
  }

  export default Index