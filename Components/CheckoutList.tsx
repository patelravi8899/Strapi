import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAPI } from "../lib/api";
import { getCartInfo, setTotal } from "../Redux/Slice/cart";
import { addTocartThunk, removeFromcartThunk } from "../Redux/Thunk/Thunk";
import { fetchQuery } from "../utils";

function CheckoutList(productList: any) {
  const [productInfo, setProductInfo] = useState<any>([]);
  const [priceInfo, setPriceInfo] = useState<{
    subTotal: number;
    shippingCharge: number;
    Total: number;
  }>({
    subTotal: 0,
    shippingCharge: 0,
    Total: 0,
  });

  const slugInfo = useSelector(getCartInfo);
  const dispatch = useDispatch();

  // const fetchProductInfo = ()

  useEffect(() => {
    if (slugInfo.slugs.length > 0) {
      fetchAPI(
        "/products",
        {
          populate: "*",
          filters: {
            slug: {
              $in: slugInfo.slugs,
            },
          },
        },
        {
          method: "GET",
        }
      )
        .then((res) => setProductInfo(res.data))
        .catch((err) => console.log(err));
    }
  }, [slugInfo.slugs]);

  useEffect(() => {
    console.log(productInfo);
    if (productInfo.length > 0) {
      const subTotalVal = productInfo
        .map(
          (product: any) =>
            product.attributes.price *
            slugInfo.slugs.filter(
              (item: any) => item === product.attributes.slug
            ).length
        )
        .reduce((partialSum: number, a: number) => partialSum + a, 0);
      setPriceInfo({
        subTotal: subTotalVal,
        shippingCharge: 0,
        Total: subTotalVal + priceInfo?.shippingCharge,
      });
    }
  }, [productInfo]);

  //update Total price
  useEffect(()=>{
    dispatch(setTotal(priceInfo.Total))
  },[priceInfo])

  const handleAddProduct = (slug: string) => {
    dispatch(addTocartThunk(slug));
  };
  const handleRemoveProduct = (slug: string) => {
    const id = slugInfo.slugsId.filter((item) => item.slugName === slug)[0]
      .id[0];
    dispatch(removeFromcartThunk(id));
  };

  return (
    <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/5">
      <div className="pt-12 md:pt-0 2xl:ps-4">
        <h2 className="text-xl font-bold">Order Summary</h2>
        <div className="mt-8">
          <div className="flex flex-col space-y-4 ">
            {productInfo.map((item: any) => (
              <div className="flex space-x-4" key={item.attributes.slug}>
                <div>
                  <img
                    src={
                      item.attributes.image.data
                        ? `${process.env.NEXT_PUBLIC_STRAPI_URL}${
                            item.attributes.image.data[0].attributes.formats
                              .small
                              ? item.attributes.image.data[0].attributes.formats
                                  .small.url
                              : item.attributes.image.data[0].attributes.formats
                                  .thumbnail.url
                          }`
                        : "https://dummyimage.com/400x400"
                    }
                    alt="image"
                    className="w-60 h-40"
                  />
                </div>
                <div>
                  <h3 className="break-normal text-xl font-bold">
                    {item.attributes.title}
                  </h3>
                  <p className="text-sm">
                    Quantity:
                    <button
                      className="font-bold text-xl px-2"
                      onClick={(e) => handleRemoveProduct(item.attributes.slug)}
                    >
                     -
                      
                    </button>
                    {
                      slugInfo.slugs.filter(
                        (element) => element === item.attributes.slug
                      ).length
                    }
                    <button
                      className="font-bold text-xl px-2"
                      onClick={() => handleAddProduct(item.attributes.slug)}
                    >
                      {" "}
                      +{" "}
                    </button>
                  </p>
                  <span>Price : </span> ₹{item.attributes.price}
                  <p className="text-sm">
                    Total : ₹{" "}
                    {item.attributes.price *
                      slugInfo.slugs.filter(
                        (element) => element === item.attributes.slug
                      ).length}
                  </p>
                </div>
                {/* <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </div> */}
              </div>
            ))}
          </div>
        </div>
        {/* <div className="flex p-4 mt-4">
          <h2 className="text-xl font-bold">ITEMS 2</h2>
        </div> */}
        <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
          Subtotal<span className="ml-2">₹{priceInfo?.subTotal}</span>
        </div>
        <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
          Shipping Tax<span className="ml-2">₹{priceInfo?.shippingCharge}</span>
        </div>
        <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
          Total<span className="ml-2">₹{priceInfo?.Total}</span>
        </div>
      </div>
    </div>
  );
}

export default CheckoutList;
