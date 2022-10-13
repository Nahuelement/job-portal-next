import { NextPage } from "next"
import { Layout } from "../components/layout"
import { TopicStats } from "../components/stats/TopicStats"





const Index: NextPage = () => {



    return (

      <Layout title={'Topic Stats'}  >
        <TopicStats />
      </Layout>
    )
  }

  export default Index