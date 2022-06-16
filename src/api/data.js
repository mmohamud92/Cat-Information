async function getCatBreeds() {
  let catNames = [];
  const response = await fetch("https://api.thecatapi.com/v1/breeds", {
    method: "GET",
    withCredentials: true,
    headers: {
      "X-API-KEY": process.env.API_KEY,
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();

  for (let i = 0; i < data.length; i++) {
    const catName = data[i].name;
    catNames.push(catName);
  }
  console.log(catNames);
  return catNames;
}

export default getCatBreeds;
