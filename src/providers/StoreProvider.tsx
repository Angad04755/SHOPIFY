"use client";
import { Provider } from "react-redux";
import {store} from "../../store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../../store/store";
function StoreProvider (props: any) {
    return (
    <Provider store={store}>
        <PersistGate persistor={persistor}>
        {props.children}
        </PersistGate>
    </Provider>
    );
}
export default StoreProvider;