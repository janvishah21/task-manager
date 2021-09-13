import { combineReducers } from "redux";
import PageContentStateReducer from "./PageContentStateReducer";
import AuthReducer from './AuthReducer';
import PopUpReducer from './PopUpReducer';
import NotificationReducer from './NotificationReducer';
import ReleaseReducer from './ReleaseReducer';
import UsersReducer from './UsersReducer';
import LoaderReducer from './LoaderReducer';

export default combineReducers({
    pageContentState: PageContentStateReducer,
    auth: AuthReducer,
    releases: ReleaseReducer,
    users: UsersReducer,
    popUp: PopUpReducer,
    loader: LoaderReducer,
    notification: NotificationReducer
});