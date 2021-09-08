import { UPDATE_PAGE_CONTENT_STATE } from "./types";

export const updatePageContentState = (payload) => dispatch => {
    dispatch({
        type: UPDATE_PAGE_CONTENT_STATE,
        payload
    });
}