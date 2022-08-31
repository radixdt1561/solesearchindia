// States
export const state = () => ({
    toggleSidebar: false
})

// mutations
export const mutations = {
    TOGGLE_SIDEBAR(state,payload) {
        state.toggleSidebar = payload
    },
}

// actions
export const actions = {
    hideSidebar({ commit,state},payload) {
        commit('TOGGLE_SIDEBAR',payload)
    },
    showSidebar({ commit,state},payload) {
        commit('TOGGLE_SIDEBAR',payload)
    }
}

// Getters
export const getters = {
    toggleSidebar: state => state.toggleSidebar,
}