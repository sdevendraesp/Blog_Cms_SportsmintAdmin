import * as ACTIONTYPES from '../actionTypes.js'

export const initialState = {
    LoginDetails: {},
    AuthToken: '',
    isLogin: false,
    walletConnnected: "",
    customizationPlayer: [],
    planData: []
};
export default function auth(state = initialState, action) {

    switch (action.type) {
        case ACTIONTYPES.USERLOGIN:
            return {
                ...state,
                LoginDetails: action.payload,
                AuthToken: action.token,
                isLogin: action.isLogin
            };
        default:
            return state;
    }
}
