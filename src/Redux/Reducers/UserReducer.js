import * as  actions from "../Actions/Actions"

const initializeState = {
    user: null
}

const userReducer = (state = initializeState, action) => {
    switch (action.type) {
        case actions.SET_USER:
            return {
                user: action.payload
            }

        default:
            return state;
    }
}
export default userReducer