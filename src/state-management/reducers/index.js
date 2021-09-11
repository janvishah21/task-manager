import { combineReducers } from "redux";
import PageContentStateReducer from "./PageContentStateReducer";
import AuthReducer from './AuthReducer';
import AuthPopUpReducer from './AuthPopUpReducer';
import NotificationReducer from './NotificationReducer';
import ReleaseReducer from './ReleaseReducer';
import UsersReducer from './UsersReducer';
import LoaderReducer from './LoaderReducer';

export default combineReducers({
    pageContentState: PageContentStateReducer,
    auth: AuthReducer,
    users: UsersReducer,
    authPopUp: AuthPopUpReducer,
    loader: LoaderReducer,
    notification: NotificationReducer,
    releases: ReleaseReducer
});