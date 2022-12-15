import qs from "qs"

/**
 * Get full Strapi URL from path
 * @param {string} path Path of the URL
 * @returns {string} Full Strapi URL
 */
export function getStrapiURL(path = "") {
  return `${
    process.env.STRAPI_URL || process.env.NEXT_PUBLIC_STRAPI_URL
  }${path}`;
}

/**
 * Helper to make GET requests to Strapi API endpoints
 * @param {string} path Path of the API route
 * @param {Object} urlParamsObject URL params object, will be stringified
 * @param {Object} options Options passed to fetch
 * @returns Parsed API call response
 */
export async function fetchAPI(path, urlParamsObject = {}, options = {}) {
  // Merge default and user options
  const mergedOptions = {
    headers: {
      "Content-Type": "application/json",
      "Authorization" : `Bearer ${process.env.ADMIN_TOKEN || process.env.NEXT_PUBLIC_ADMIN_TOKEN}`
    },
    ...options,
  };

  // Build request URLAuthorization
  const queryString = qs.stringify(urlParamsObject);
  const requestUrl = `${getStrapiURL(
    `/api${path}${queryString ? `?${queryString}` : ""}`
  )}`;

  // Trigger API call
  console.log("AAAAAA",requestUrl,mergedOptions)
  const response = await fetch(requestUrl, mergedOptions).then(r=>r.json()).then(res=>res).catch(err=>err);

  console.log("DSSSSS",response)
  // Handle response
  // if (!response.ok) {
  //   console.error(response.statusText);
  //   throw new Error(`An error occured please try again`);
  // }
  // const data = await response.json();
  return response;
}