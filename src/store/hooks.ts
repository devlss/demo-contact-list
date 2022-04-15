import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {store} from '.';
import type {AppState} from './types';

/**
 * Обертки необходимы для типизации
 */
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
