import { combineReducers } from 'redux';
import popupReducer from './popups';
import FileUploadReducer from './file_upload';

export default () => combineReducers({
  popup: popupReducer,
  file_upload: FileUploadReducer,
});
