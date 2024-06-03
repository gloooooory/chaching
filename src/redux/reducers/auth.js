import types from "../types";

const initial_state = {
    userData: {},
    internetConnection: false
}
export default function (state = initial_state, action) {
    switch (action.type) {
        case types.LOGIN: {
            const data = action.payload
            return { userData: data };
        }
        case types.NO_INTERNET: {
            const internetConnection = action.payload.internetConnection
            return { ...state, internetConnection }
        }
        default: {
            return { ...state }
        }
    }
}