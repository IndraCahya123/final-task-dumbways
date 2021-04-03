import {createContext, useReducer} from 'react';

export const MenuContext = createContext();

const initialValues = {
    statusMenu : "",
};

const reducer = (state, action) => {
    //action params
    const { type } = action;

    switch (type) {
        case "TEMPLATE":
            return {
                ...state,
                statusMenu: "Template",
            };
        case "PROFILE":
            return {
                ...state,
                statusMenu: "Profile",
            };
        case "MYLINK":
            return {
                ...state,
                statusMenu: "My Link",
            };
    
        default:
            throw new Error();
    }
}

export const MenuContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialValues);

    return (
        <MenuContext.Provider value={[state, dispatch]} >
            {children}
        </MenuContext.Provider>
    );
} 