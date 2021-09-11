import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './state-management/reducers';
import { saveState, loadState } from './localStorage';

const persistedState = loadState();

const middleware = [thunk];

const store = createStore(
    rootReducer,
    persistedState,
    compose(
        applyMiddleware(...middleware),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

store.subscribe(() => {
    saveState({
        pageContentState: store.getState().pageContentState,
        auth: store.getState().auth,
        releases: store.getState().releases
    });
});

export default store;