
import * as actions from "./Actions"

export const setUser = (user) => {
    return {
        type: actions.SET_USER,
        payload: user
    }
}
export const setLoading = (status) => {
    return {
        type: actions.SET_LOADING_STATUS,
        status: status
    }
}

export const getArticles = (payload) => {
    return {
        type: actions.GET_ARTICLES,
        payload: payload
    }
}
