import Script from "next/script";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { fetchAPI } from "../lib/api";
import { getCartInfo } from "../Redux/Slice/cart";
import { CheckPaytm } from "../lib/payment";

function ShippingForm() {
  const [shippingDetails, setShippingDetails] = useState<{
    fullName: string;
    email: string;
    address: string;
    phoneNo: number;
  }>({
    fullName: "",
    address: "",
    email: "",
    phoneNo: 0,
  });

  const cartDetails = useSelector(getCartInfo);

  const handleForm = (e: any) => {
    const { name, value } = e.target;
    setShippingDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    console.log(shippingDetails);
  }, [shippingDetails]);

  const handleTransaction = async (e: any) => {
    e.preventDefault();
    let orderId = "OID" + Math.floor(1000000 * Math.random());
    const response = await fetchAPI(
      `/order/pretransaction`,
      {},
      {
        method: "POST",
        body: JSON.stringify({
          orderid: orderId,
          amount: cartDetails.totalPrice,
          ...shippingDetails,
          products: cartDetails.slugsId,
        }),
      }
    );
    console.log(response);

    const txntoken = response.body.txnToken;

    var config = {
      root: "",
      flow: "DEFAULT",
      data: {
        orderId: orderId /* update order id */,
        token: txntoken /* update token value */,
        tokenType: "TXN_TOKEN",
        amount: cartDetails.totalPrice /* update amount */,
      },
      handler: {
        notifyMerchant: function (eventName: any, data: any) {
          console.log("notifyMerchant handler function called");
          console.log("eventName => ", eventName);
          console.log("data => ", data);
        },
      },
    };
    CheckPaytm(config);
  };

  return (
    <div className="flex flex-col md:w-full">
      <Script
        type="application/javascript"
        src="https://securegw-stage.paytm.in/merchantpgpui/checkoutjs/merchants/nYJhce69957316451339.js"
        crossOrigin="anonymous"
      ></Script>
      <h2 className="mb-4 font-bold md:text-xl text-heading ">
        Shipping Address
      </h2>
      <form
        className="justify-center w-full mx-auto"
        onSubmit={(e) => handleTransaction(e)}
      >
        <div className="">
          <div className="space-x-0 lg:flex lg:space-x-4">
            <div className="w-full ">
              <label
                htmlFor="fullName"
                className="block mb-3 text-sm font-semibold text-gray-500"
              >
                Enter Full Name
              </label>
              <input
                name="fullName"
                type="text"
                placeholder="First Name"
                onChange={handleForm}
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
          </div>
          <div className="mt-4 space-x-0 lg:flex lg:space-x-4">
            <div className="w-full ">
              <label
                htmlFor="email"
                className="block mb-3 text-sm font-semibold text-gray-500"
              >
                Email
              </label>
              <input
                name="email"
                type="email"
                onChange={handleForm}
                placeholder="Email"
                className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
              />
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full">
              <label
                htmlFor="address"
                className="block mb-3 text-sm font-semibold text-gray-500"
              >
                Address
              </label>
              <textarea
                className="w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
                name="address"
                onChange={handleForm}
                cols={20}
                rows={4}
                placeholder="Address"
              ></textarea>
            </div>
          </div>

          <div className="mt-4">
            <button
              disabled={!(shippingDetails.address !== "" && shippingDetails.email !== "" && shippingDetails.fullName !== "")}
              className="w-full px-6 py-2 text-blue-200 bg-blue-600 hover:bg-blue-900"
            >
              Process
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ShippingForm;
