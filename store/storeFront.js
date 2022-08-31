export const state = () => ({
    hits: []
})

export const mutations = {
    getSneakers: (state, payload) => {
        state.hits = payload
    }
}

export const getters = {
    getSneakersData: state=>{
        return state.hits
    }
}