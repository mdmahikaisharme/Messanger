import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useReducer,
} from "react";
import cookie, { COOKIE } from "@lib/cookie";
import { iAppState, tAppAction } from "@Types/context/App.d";
import services from "@services";

const AppState: iAppState = {
    user: undefined,
    dispatch: (action: tAppAction) => null,
};
const AppContext = createContext<iAppState>(AppState);

function AppReducer(state: iAppState, action: tAppAction) {
    switch (action.type) {
        case "LOGIN": {
            return { ...state, user: action.payload };
        }
        case "LOGOUT": {
            return { ...state, user: undefined };
        }

        default: {
            return state;
        }
    }
}

function AppContextProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(AppReducer, AppState);

    // Load User
    const fLoadUser = async () => {
        if (state.user) return;
        const accessToken = cookie.get(COOKIE.AccessToken);
        if (!accessToken) return;

        const request = await services.user.getUser(accessToken);
        if (request.status !== 200) return;

        dispatch({ type: "LOGIN", payload: request.data.user });
    };

    // for user
    useEffect(() => {
        (async () => await fLoadUser())();
    }, [state.user]);

    return (
        <AppContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
}

function useAppContext() {
    return useContext(AppContext);
}

export { AppContext, AppContextProvider, useAppContext };
