export default axios => {
  const apis = {
    checkSellerVerified: authToken => {
      return axios.post(
        "/graphql",
        {
          query: `query{
  checkSellerVerified
}`
        },
        {
          headers: {
            Authorization: "Bearer " + authToken
          }
        }
      );
    }
  };
  return apis;
};
