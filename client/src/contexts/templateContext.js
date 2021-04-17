import {createContext, useReducer} from 'react';

export const TemplateContext = createContext();

const initialValues = {
    addLinkState: false,
    editLinkState: false,
    editedLink: {},
    templateId: 0
};

const reducer = (state, action) => {
    //action params
    const { type, payload } = action;

    switch (type) {
        case "ADD_LINK":
            return {
                ...state,
                addLinkState: true,
                editLinkState: false,
                templateId: payload.templateId
            };
        case "EDIT_LINK":
            return {
                addLinkState: false,
                editLinkState: true,
                editedLink: payload.link,
                templateId: payload.templateId
            };
        case "SET_NEW_TEMPLATE":
        case "CHANGE_TEMPLATE":
            return {
                ...state,
                templateId: payload.templateId
            };
        case "MAIN_ROUTE":
            return {
                addLinkState: false,
                editLinkState: false,
                editedLink: {},
                templateId: 0
            }
    
        default:
            throw new Error();
    }
}

export const TemplateContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialValues);

    return (
        <TemplateContext.Provider value={[state, dispatch]} >
            {children}
        </TemplateContext.Provider>
    );
} 