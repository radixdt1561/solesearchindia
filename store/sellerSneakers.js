export const state = () => ({
    hits: [],
    topCollections: [],
    singleHits:[]
  })
  
  //   export const action={
  //       getSneakers({commit, payload}){
  //           console.log(payload)
  //       }
  //   }
  export const mutations = {
    getSneakers: (state, payload) => {
      state.hits = payload
      // console.log("mutation",state.hits)
    },
    // seeMore: (state, payload) => {
    //   state.hits = [...state.hits, ...payload.hits]
    // },
    // topCollections: (state, payload) => {
    //   state.topCollections = payload.hits
    // },
    getSingleSneakers: (state, payload) => {
      // console.log("mutation",payload[0])
      state.singleHits = payload
      // console.log("mutation",state.singleHits)
    },
  }
  
  export const getters = {
    getSneakersData: state => {
      return state.hits
    },
    getSingleSneakersData: state => {
      return state.singleHits
    },
    // getTopCollections: state => {
    //   return state.topCollections
    // }
  }
  