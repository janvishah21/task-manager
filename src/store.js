import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './state-management/reducers';
import { saveState, loadState } from './localStorage';

const persistedState = loadState();

const middleware = [thunk];

const store = createStore(
    rootReducer,
    persistedState,
    applyMiddleware(...middleware),
);

store.subscribe(() => {
    saveState({
        pageContentState: store.getState().pageContentState,
        auth: store.getState().auth,
        releases: store.getState().releases,
    });
});

export default store;