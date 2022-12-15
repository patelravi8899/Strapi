import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import { useEffect } from "react";
import { fetchAPI } from "../lib/api";
import styles from "../styles/Home.module.css";

function Home(props: any) {
  useEffect(() => {
    console.log(props);
  }, [props]);
  return <h1 className="text-3xl font-bold underline">Hello world!</h1>;
}

export async function getStaticProps() {
  // Run API calls in parallel
  const API_URL =  process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:1337'
  const productsList = await axios.get(`${API_URL}/api/products?populate=*`).then(res=>res.data).catch(err=>err)
  console.log(productsList)

  return {
    props: {
      productsList,
    },
    revalidate: 1,
  };
}

export default Home;
