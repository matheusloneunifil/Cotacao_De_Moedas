interface State {
    appState: AppState;
    router: any;
}

interface AppState {
    isLoading: boolean;
    themeMode: string;
    errorMessage: sting;
}
