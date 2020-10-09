import React, { createContext, useReducer } from "react";

import { AppReducer } from "../reducers/AppReducer";

interface ContextType {
    state: {
        loading: false;
        post: {};
        posts: string[];
    };
    dispatch: React.Dispatch<{ type: string; value: unknown }>;
}

export const AppContext = createContext<ContextType | null>(null);

const AppContextProvider = (props: any) => {
    const [state, dispatch] = useReducer(AppReducer, {
        loading: false,
        post: {},
        posts: [],
    });

    return (
        <AppContext.Provider value={{ state, dispatch }}>
            {props.children}
        </AppContext.Provider>
    );
};

export default AppContextProvider;
