import { async, reject } from "q";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import CheckoutList from "../Components/CheckoutList";
import ShippingForm from "../Components/ShippingForm";
import { getCartInfo } from "../Redux/Slice/cart";
import { wrapper } from "../Redux/Store/store";
import { fetchQuery } from "../utils";

function checkout(props:any) {
  const cardList = useSelector(getCartInfo)

  useEffect(()=>{
    console.log(props)
  },[props])
  return (
    <div>
      <div className="mt-20">
        <h1 className="flex items-center justify-center font-bold text-blue-600 text-md lg:text-3xl">
        Please fill below details for Payment.
        </h1>
      </div>
      <div className="container p-12 mx-auto">
        <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
         <ShippingForm />
        <CheckoutList productList={props.pageProps.data} />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps = wrapper.getServerSideProps(store => async ({ query }) => {
  // console.log('store state on the server before dispatch', store.getState());
  const getCarts = await fetchQuery(
    "carts",
    `?filters[username]=${process.env.NEXT_PUBLIC_CUSTOMER}`,
    "GET"
  );
  let slugList:Array<string> = await getCarts.data.map((item:any)=>item.attributes.productSlug)
  slugList = slugList.filter((item:string,index:number)=>index === slugList.lastIndexOf(item))

  // let cartProductsInfo:Array<any> = await new Promise((resolve,reject)=>{
  //   let pl:Array<any> =  slugList.map(async(element:any)=>{
      
  //     const p = await fetchQuery(
  //       "products",
  //       `?filters[slug]=${element}&populate=*`,
  //       "GET"
  //       )
  //       console.log("first",p.data[0])
  //       return await p.data[0]
  //     })
  //   })

  // store.dispatch();
  // console.log('store state on the server after dispatch', store.getState(),cartProductsInfo);

  // const data = query.data || 'default data';
  //  http://localhost:3000?data='some-data'

  return {
    props: {
      data:  JSON.parse(JSON.stringify(slugList))
    } // will be passed to the page component as props
  };
});

export default checkout;

// export const getServerSideProps =  wrapper.(ctx:any)=>{
//   const filtercartList = ctx.query.cardList
//   // .filter((item:string,index:number)=>index === ctx.query.cardList.lastIndexOf(item))
//   console.log(filtercartList)
//   // const orderList = fetchQuery(
//   //   "products",
//   //   `?filters[slug]=${ctx.query.slug}&populate=*`,
//   //   "GET"
//   // );
//   return {
//     props:{
//       data:"aa"
//     }
//   }
// }

// export const getServerSideProps = wrapper.getServerSideProps( (store)=>async ()=>{
//   // store.dispatch({type: FETCH_BLOG_LIST});
//   // store.dispatch(END);
//   // await store.sagaTask.toPromise();
// });

// export const getServerSideProps = wrapper.getServerSideProps(
//   (store) => async () => {
//   const response = await fetch(
//     `https://reqres.in/api/users/${Math.floor(Math.random() * 10 + 1)}`
//   );
//   const { data } = await response.json();
// })