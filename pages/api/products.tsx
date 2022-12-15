export async function getProducts() {
  const getData = await fetch("http://localhost:1337/api/products", {
    headers: {
      Authorization:
        "Bearer ff93a6caedb3e981f920dd320af1f77c8a33cd3febbe81598f33f6ba9fe4b70619750dc87a497723a36f3cfad9450bdab1000aad71f2887c505c6764411e89212e34f4b576ec50f9fd557e90ff306c662f6c002b17388205c7e497de9ee1eff8e6239dfda1d48584a3e924abd23886c06394cf1caa71d05a672fd69d95594012",
      //   "Content-Type": "application/json",
    },
  });
  return getData;
}
