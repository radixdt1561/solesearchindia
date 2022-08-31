export default axios => {
  const apis = {
    getProductsBySlug: async slug => {
      return await axios.post("/graphql", {
        query: `query($slug:String!){
  productsBySlug(slug:$slug){
    slug
    size
    price
  }
}`,
        variables: {
          slug: slug
        }
      });
    },
    getQueryResults: async query => {
      return await axios.get(`/query-results/${query}`);
    },
    getProductTypes: async () => {
      return await axios.post("/filters", {
        query: { match_all: {} },
        aggs: {
          productTypes: {
            terms: {
              field: "product_type.keyword"
            }
          }
        }
      });
    },
    getBrands: async productType => {
      return await axios.post("/filters", {
        query: { match: { "product_type.keyword": productType } },
        aggs: {
          brands: {
            terms: {
              field: "brand_name.keyword"
            }
          }
        }
      });
    },
    getTrendingProducts: async productType => {
      return await axios.post("/products/filters", {
        size: 30,
        from: 0,
        query: {
          bool: {
            filter: [
              {
                term: {
                  "product_type.keyword": productType
                }
              }
            ]
          }
        },
        sort: [
          {
            "release_year.keyword": "desc"
          }
        ]
      });
    },
    getTrendingBrandProducts: async brand => {
      return await axios.post("/products/filters", {
        size: 100,
        from: 0,
        query: {
          bool: {
            filter: [
              {
                term: {
                  product_type: "sneakers"
                }
              },
              {
                term: {
                  "brand_name.keyword": brand
                }
              }
            ]
          }
        },
        sort: [
          {
            "release_year.keyword": "desc"
          }
        ]
      });
    },
    deleteStoreFrontProduct: async (productId, token) => {
      return await axios.delete("/store-front", {
        headers: {
          Authorization: "Bearer " + token
        },
        data: { product_id: productId }
      });
    },
    getStoreFrontPendingProducts: async token => {
      return await axios.get("/store-front", {
        headers: {
          Authorization: "Bearer " + token
        }
      });
    },
    getStoreFrontSoldProducts: async token => {
      return await axios.get("/sold-product", {
        headers: {
          Authorization: "Bearer " + token
        }
      });
    },
    getTrendingBidProducts: async () => {
      return await axios.get("/product/trending");
    },
    getRecentlySoldProducts: async () => {
      return await axios.get("/product/recently-sold");
    }
  };

  return apis;
};
