import axios from "axios";

const baseUrl = process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL;
async function fetchQuery(path: string, params: string | null = null,method:string = "GET",body:object  = {}) {
  let url;
  if (params !== null) {
    url = `${baseUrl}/api/${path}/${params}`;
  } else {
    url = `${baseUrl}/api/${path}`;
  }
console.log(url)
// if()
// const apiObject = 
const response  = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${process.env.ADMIN_TOKEN || process.env.NEXT_PUBLIC_ADMIN_TOKEN}`
    },
    body: method !== "GET" ?JSON.stringify(body) : null
  })
    .then((r) => r.json())
    .then((res) => res)
    .catch((err) => err);
    // console.log(response)

    return response 
}
export {  fetchQuery };
