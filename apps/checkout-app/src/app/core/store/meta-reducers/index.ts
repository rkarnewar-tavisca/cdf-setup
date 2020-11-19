import { ActionReducer, MetaReducer } from '@ngrx/store';
import { IAppState } from '../state/app.state';

/**
 * Logs the state using Logging SDK
 * @param reducer application leve reducer
 */
const logger = (reducer: ActionReducer<IAppState>): ActionReducer<IAppState> => {
  return (state: IAppState, action: any): IAppState => {
    // TODO Logger can be added at this stage
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<IAppState>[] = [logger];
