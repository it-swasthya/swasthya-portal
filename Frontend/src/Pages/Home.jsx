import React from 'react'
import Layout from '../Components/Layout'
import TestCarousel from './TestCarousel'
import FormWithInfo from '../Components/FormWithInfo'
import "../Styles/HomeStyle.css"

const Home = () => {
  return (
    <Layout>
        <FormWithInfo/> 
       <TestCarousel/>
    </Layout>
  )
}

export default Home