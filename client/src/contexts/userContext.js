import { createContext, useReducer } from 'react';

export const UserContext = createContext();

const initialValues = {
    loginStatus: false,
    user: null,
    loading: true,
};

const reducer = (state, action) => {
    //action params
    const {type, payload} = action;

    switch (type) {
        case "AUTH_SUCCESS":
        case "REGISTER":
        case "LOGIN":
        case "SUCCESS_REFETCH":
            //set Token to local storage
            localStorage.setItem("token", payload.user.token);
            
            return {
                ...state,
                loginStatus: true,
                user: payload.user,
                loading: false
            };
        case "AUTH_ERROR":
        case "LOGOUT":
            localStorage.removeItem("token")
            return {
                ...state,
                loginStatus: false,
                loading: true,
            }
    
        default:
            throw new Error();
    }
}

export const UserContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialValues);

    return (
        <UserContext.Provider value={[state, dispatch]} >
            {children}
        </UserContext.Provider>
    );
} 