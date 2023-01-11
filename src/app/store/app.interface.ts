export interface IApp {
  username: string;
}

export interface IAppState {
  AppState: IApp;
}
export const initialAppState: IApp = {
  username: ""
};