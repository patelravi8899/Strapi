import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAPI } from "../../lib/api";
import { fetchQuery } from "../../utils";

export const getcartThunk: any = createAsyncThunk("getcart", async () => {
    const product = await fetchQuery(
      "carts",
      `?filters[username]=${process.env.NEXT_PUBLIC_CUSTOMER}`,
      "GET"
    );
    return product;
  });

  export const addTocartThunk: any = createAsyncThunk(
    "addtocart",
    async (slug: any) => {
      const body = {
        data: {
          username: "ravipatel",
          productSlug: slug,
        },
      };
      console.log(body);
      const product = await fetchQuery(
        "carts",
        `?filters[username]=${process.env.NEXT_PUBLIC_CUSTOMER}`,
        "POST",
        body
      );
      return product;
    }
  );

  export const removeFromcartThunk: any = createAsyncThunk(
    "removefromcart",
    async (id:number) => {
     
      const response = await fetchAPI(
        `/carts/${id}`,{},
        {
          method: "DELETE",
        }
      )
      return response;
    }
  );