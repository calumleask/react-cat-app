import uploadReducer from "../reducers/UploadReducer";

export const selectIsUploading = (state: AppState): boolean => uploadReducer.selectState(state).uploading;
