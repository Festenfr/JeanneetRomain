export const state = () => ({})
export const getters = {
    isTouch() {
        try {
            document.createEvent('TouchEvent')
            return true
        } catch (e) {
            return false
        }
    }
}
export const mutations = {
    SET(state, obj) {
        state[obj.property] = obj.value
    }
}
export const actions = {
    set({ commit }, obj) {
        commit('SET', obj)
    }
}
