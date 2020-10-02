import React from "react";
import Layout from "../hoc/Layout";
import Hero from "../components/Hero";
import Services from "../components/Services";
const Home = () => {
  return (
    <Layout>
      <Hero title="home page" />
      <Services />
    </Layout>
  );
};

export default Home;
