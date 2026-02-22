"use client";
import { Provider } from "react-redux";
import store from "../../store/store";


function StoreProvider (props: any) {
    return (
    <Provider store={store}>
        {props.children}
    </Provider>
    );
}
export default StoreProvider;