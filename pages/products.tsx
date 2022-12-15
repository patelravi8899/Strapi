import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { fetchAPI } from "../lib/api";
import { fetchQuery } from "../utils";

export const getServerSideProps = async (ctx: any) => {
  const productList = await  fetchQuery('products',"?populate=*","GET")
  console.log(productList)
  return {
    props: {
      productsList: JSON.parse(JSON.stringify(productList)),
    },
  };
};

// export const getServerSideProps =async (ctx:any) => {
//   const productsList = await fetchAPI('/products?populate=*',{},{
//     method:"GET"
//   })
//   console.log(productsList)
//   return {
//     props: {
//       productsList:JSON.parse(JSON.stringify(productsList))
//     },
//   };
// }

function productPage(props: any) {
  const [products, setProducts] = useState<any>([...props.pageProps.productsList.data]);

  useEffect(() => {
    console.log(props);
  }, [props]);

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap w-full mb-20">
          <div className="lg:w-1/2 w-full mb-6 lg:mb-0">
            <h1 className="sm:text-3xl text-2xl font-medium title-font mb-2 text-gray-900">
              Shop At Web3Com
            </h1>
            <div className="h-1 w-20 bg-indigo-500 rounded"></div>
          </div>
          <p className="lg:w-1/2 w-full leading-relaxed text-gray-500">
            World's first web3.0 Shopping Place. web3Com is a new generation of
            the evolution of shoping. Shop with crypto currency and get exciting
            rewards and cashbacks. Get a chance to earn NFT.
          </p>
        </div>
        <div className="flex flex-wrap -m-4">
          {products.map((item: any, index:number) => (
            <div className="xl:w-1/4 md:w-1/2 p-4" key={index}>
              <div className="bg-gray-100 p-6 rounded-lg">
                <img
                  className="h-40 rounded w-full object-cover object-center mb-6"
                  src={
                    item.attributes.image.data
                      ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${item.attributes.image.data[0].attributes.url}`
                      : "https://dummyimage.com/720x400"
                  }
                  alt="content"
                />
                <h2 className="text-lg text-gray-900 font-medium title-font ">
                  {item.attributes.title}
                </h2>
                <h3 className="tracking-widest text-indigo-500 text-xs font-medium title-font mb-4">
                  Color :
                  <span
                    className="ml-2 mr-2 w-3 align-middle h-3 rounded inline-block"
                    style={{ background: item.attributes.color }}
                  />
                  {item.attributes.color}
                </h3>
                <h3
                  data-price={item.attributes.price}
                  className="tracking-widest text-xs font-medium title-font mb-4"
                >
                  Price :
                </h3>
                <p className="leading-relaxed item.attributes.description)text-base mb-2">
                  {item.attributes.description.length < 100
                    ? item.attributes.description
                    : item.attributes.description.slice(0, 100)}
                  <span
                    data-length={
                      item.attributes.description.length > 100
                        ? "Read More..."
                        : ""
                    }
                  />
                </p>
                <Link href={`/product/${item.attributes.slug}`}>
                  <button className="w-auto px-4 py-2 rounded-md bg-blue-700 text-white">
                    Buy Now
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// export async function getServerSideProps(context: any) {
//   let headers = {Authorization: `Bearer ${process.env.ADMIN_TOKEN}`}
//   let a = await axios.get("http://localhost:1337/api/products?populate=*",{headers:headers});
//   let products = await a.data
//   return {
//     props: { products: products },
//   };
// }

export default productPage;
