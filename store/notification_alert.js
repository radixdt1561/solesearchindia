export const state = () => ({
    notificationAlert: null
})

export const mutations = {
    mutateNotification: (state, payload) => {
        if (payload) {
            state.notificationAlert = payload
        }
    }
}

export const actions = {
    updateNotification: ({ commit }, payload) => {
        if (payload) {
            commit('mutateNotification', payload)
        }
    }
}

export const getters = {
    getNotificationAlert: state => {
        return state.notificationAlert
    }
}
