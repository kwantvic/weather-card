import {configureStore} from '@reduxjs/toolkit';

import cityReducer from './findCitySlice';
import favoriteReducer from './favCitySlice';
import detailedReducer from './detailCitySlice';

export type RootState = ReturnType<typeof store.getState>;

const store = configureStore({
    reducer: {
        city: cityReducer,
        favorite: favoriteReducer,
        detailed: detailedReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
    devTools: process.env.NODE_ENV !== 'production'
})

export default store;