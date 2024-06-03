import types from "../types";
const initial_state = {
    isFirstTime: false
}
export default function (state = initial_state, action) {
    switch (action.type) {
        case types.IS_FIRST_TIME: {
            const data = action.payload
            return { isFirstTime: data };
        }
        default: {
            return { ...state }
        }
    }
}