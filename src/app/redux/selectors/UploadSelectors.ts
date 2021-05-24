import uploadReducer from "../reducers/UploadReducer";

export const selectIsUploading = (state: AppState): boolean => uploadReducer.selectState(state).uploading;

export const selectUploadComplete = (state: AppState): boolean => uploadReducer.selectState(state).uploaded;

export const selectUploadErrorMessage = (state: AppState): string => uploadReducer.selectState(state).uploadErrorMessage;
