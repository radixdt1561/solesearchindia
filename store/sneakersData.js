export const state = () => ({
  hits: [],
  topCollections: [],
  singleHits: {},
  wishListed: {
    wishlist: [],
    wishlistLength: ""
  }
});

//   export const action={
//       getSneakers({commit, payload}){
//           console.log(payload)
//       }
//   }
export const mutations = {
  getSneakers: (state, payload) => {
    state.hits = payload;
    // console.log("mutation",state.hits)
  },
  seeMore: (state, payload) => {
    state.hits.products.push(...payload);
  },
  topCollections: (state, payload) => {
    state.topCollections = payload.hits;
  },
  getSingleSneakers: (state, payload) => {
    state.singleHits = payload;
    // console.log("mutation",state.singleHits)
  },
  getWishlistedSneakers: (state, payload) => {
    state.wishListed.wishlist = payload;
    state.wishListed.wishlistLength = payload.length;
    // console.log("mutation wishlist",state.wishListed)
  }
};

export const getters = {
  getSneakersData: state => {
    if (state.hits.products) {
      let formattedData = { hits: [], total: state.hits.total };
      const names = state.hits.products.map(sneaker => sneaker.slug);
      formattedData.hits = state.hits.products.filter(
        (val, index) => !names.includes(val.slug, index + 1)
      );
     return formattedData;
    } else {
      return [];
    }
  },
  getSingleSneakersData: state => {
    return state.singleHits;
  },
  getTopCollections: state => {
    return state.topCollections;
  },
  getWishlistedSneakers: state => {
    return state.wishListed;
  }
};
