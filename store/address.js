export const state = () => ({
  address: [],
})

export const mutations = {
  mutateAddress: (state, payload) => {
    if (Array.isArray(payload)) {
      state.address = payload
    }
    else{
      state.address.push(payload)
    }
  },

}
export const actions = {
  updateAddress({ commit }, payload) {
    commit('mutateAddress', payload)
  }
}

export const getters = {
  getAllAddress: state => {
    return state.address
  },
}
