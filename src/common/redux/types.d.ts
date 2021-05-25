
declare type ReducerState = unknown;

declare type AppState = Record<string, ReducerState>;

declare type ReduxAction<T = Record<string, unknown>> = { type: string; payload?: T };
