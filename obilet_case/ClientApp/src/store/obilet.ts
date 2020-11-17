import { Action, Reducer } from 'redux';
import { GetBusLocations, GetJourneys, GetSession } from '../provider/service';
import { AppThunkAction } from './';


export interface OBiletState {
    o_session: OSession;
    bus_locations: BusLocations[];
    journeys: Journeys[];
}

export interface OSession {
    device_id: string;
    session_id: string;
}
//BUS LOCATIONS INTERFACE ########
export interface BusLocations {
    id: number;
    parent_id: number;
    type: string;
    name: string;
    geo_location: GeoLocation;
    zoom: number;
    tz_code: string;
    rank: number;
    keywords: string;
}
export interface GeoLocation {
    latitude: number;
    longitude: number;
    zoom: number;
}

export interface Journeys {
    id: number;
    ['destination-location']: string;
    ['origin-location']: string;
    journey:Journey;
}

export interface Journey {
    arrival: string;
    departure: string;
    destination: string;
    origin: string;
    ['original-price']: number;
    currency: string;
}
//BUS LOCATIONS INTERFACE ########

interface ReceiveOSession {
    type: 'RECEIVE_OSESSION';
    o_session: OSession;
}

interface ReceiveBusLocations {
    type: 'RECEIVE_BUS_LOCATIONS';
    bus_locations: BusLocations[];
}

interface ReceiveJourneys {
    type: 'RECEIVE_JOURNEYS';
    journeys: [];
}

type KnownAction = ReceiveBusLocations | ReceiveJourneys | ReceiveOSession;

export const actionCreators = {
    receiveBusLocations: (o_session: OSession): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.obilet && Array.isArray(appState.obilet.bus_locations)) {
            GetBusLocations(o_session).then(data => dispatch({ type: 'RECEIVE_BUS_LOCATIONS', bus_locations: data }))
        }
    },
    receiveJourneys: (o_session: OSession, xPosition: string, yPosition: string, date: any): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.obilet && Array.isArray(appState.obilet.journeys)) {
            const postData = {
                date,
                language: 'tr-TR',
                data: {
                    origin_id: parseInt(xPosition),
                    destination_id: parseInt(yPosition),
                    departure_date: date
                },
                device_session: o_session
            }
            GetJourneys(postData).then(data => {
                dispatch({ type: 'RECEIVE_JOURNEYS', journeys: data });
            })
        }
    },
    receiveOSession: (): AppThunkAction<KnownAction> => (dispatch, getState) => {
        const appState = getState();
        if (appState && appState.obilet) {
            GetSession().then(data => {
                dispatch({ type: 'RECEIVE_OSESSION', o_session: { device_id: data.data['device-id'], session_id: data.data['session-id'] } });
            })
        }
    }
};

const unloadedState: OBiletState = { o_session: { device_id: '', session_id: '' }, bus_locations: [], journeys: [] };

export const reducer: Reducer<OBiletState> = (state: OBiletState | undefined, incomingAction: Action): OBiletState => {
    if (state === undefined) {
        return unloadedState;
    }
    const action = incomingAction as KnownAction;
    switch (action.type) {
        case 'RECEIVE_BUS_LOCATIONS':
            return Object.assign({}, state, { bus_locations: action.bus_locations });
        case 'RECEIVE_JOURNEYS':
            return Object.assign({}, state, { journeys: action.journeys });
        case 'RECEIVE_OSESSION':
            return Object.assign({}, state, { o_session: action.o_session });
        default:
            break;
    }
    return state;
};