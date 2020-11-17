import * as obilet from './obilet';

export interface ApplicationState {
    obilet: obilet.OBiletState | undefined;
}

export const reducers = {
    obilet: obilet.reducer
};

export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
