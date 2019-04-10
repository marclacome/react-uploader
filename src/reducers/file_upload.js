import {
  ADD_UPLOADABLE, SET_UPLOAD_STATE, FILE_PROGRESS, REMOVE_UPLOADABLE,
  UPLOAD_NONE, UPLOAD_COMPLETE, INIT_UPLOAD_PAGE, SELECT_DIRECTORY,
} from '../actions/file_upload';
import { initFileUpload } from './initialise';
import { IMAGE_REGEX, DOCS_REGEX, VALID_UPLOAD } from '../consts';


export default function FileUploadReducer(state = initFileUpload(), action) {
  switch (action.type) {
    case ADD_UPLOADABLE:
    {
      const p = { ...action.payload };
      delete p.size;
      const found = state.upload_ar.findIndex(item => item.fname === p.fname);
      if (found >= 0) {
        return state;
      }
      let upload = VALID_UPLOAD.Uploadable;
      if (action.payload.size > state.max_size) upload = VALID_UPLOAD['Too Big'];
      else {
        let regex;
        if (action.payload.filetype === 'image') regex = IMAGE_REGEX;
        else regex = DOCS_REGEX;

        if (regex.exec(action.payload.fname) === null) upload = VALID_UPLOAD['Wrong Filetype'];
      }
      return state.upload_state === UPLOAD_COMPLETE
        ? { ...state, upload_ar: [{ ...p, enabled: upload, complete: UPLOAD_NONE }], upload_state: UPLOAD_NONE }
        : { ...state, upload_ar: [...state.upload_ar, { ...p, enabled: upload, complete: UPLOAD_NONE }] };
    }
    case REMOVE_UPLOADABLE:
      return { ...state, upload_ar: state.upload_ar.slice(0, action.index).concat(state.upload_ar.slice(action.index + 1)) };
    case SET_UPLOAD_STATE:
      return { ...state, upload_state: action.uploadState };
    case FILE_PROGRESS:
      const index = state.upload_ar.findIndex(item => (item.fname === action.fname));
      return { ...state, upload_ar: state.upload_ar.slice(0, index).concat({ ...state.upload_ar[index], complete: action.complete }).concat(state.upload_ar.slice(index + 1)) };
    case INIT_UPLOAD_PAGE:
      return {
        ...state, directories: action.directories, selected_directory: action.directories[0], max_size: action.max_size, upload_ar: [],
      };
    case SELECT_DIRECTORY:
      return { ...state, selected_directory: action.selected };
    default:
      return state;
  }
}
