import { combineReducers } from "redux";
import PageContentStateReducer from "./PageContentStateReducer";
import AuthReducer from './AuthReducer';
import AuthPopUpReducer from './AuthPopUpReducer';
import NotificationReducer from './NotificationReducer';

export default combineReducers({
    pageContentState: PageContentStateReducer,
    auth: AuthReducer,
    authPopUp: AuthPopUpReducer,
    notification: NotificationReducer
});