/* eslint-disable no-tabs */
/* eslint-disable no-plusplus */
import { VALID_UPLOAD } from '../consts';

export const ADD_UPLOADABLE = 'ADD_UPLOADABLE';
export const REMOVE_UPLOADABLE = 'REMOVE_UPLOADABLE';
export const DO_UPLOAD = 'DO_UPLOAD';
export const SET_UPLOAD_STATE = 'SET_UPLOAD_STATE';
export const INIT_UPLOAD_PAGE = 'INIT_UPLOAD_PAGE';
export const SELECT_DIRECTORY = 'SELECT_DIRECTORY';

export const UPLOAD_IN_PROGRESS = 'UPLOAD IN PROGRESS';
export const UPLOAD_NONE = 'READY';
export const UPLOAD_COMPLETE = 'UPLOAD COMPLETE';
export const UPLOAD_FAILED = 'FAILED';
export const FILE_PROGRESS = 'FILE_PROGRESS';

const _URL = 'http://localhost/bttc/public/';


const uploadList = (list, index, dir, filetype, dispatch) => new Promise((resolve, reject) => {
  function uploadFile(list, index, dir, filetype, dispatch) {
    return new Promise((resolve) => {
      const item = list[index];
      if (item.enabled !== VALID_UPLOAD.Uploadable) {
        return resolve(++index);
      }
      const f = new FormData();
      f.append('items[]', JSON.stringify({ fname: item.fname, file_data: item.file_data }));
      f.append('dir', dir);
      f.append('filetype', filetype);

      let innerIndex = 0;
      const tim = window.setInterval(() => {
        if (innerIndex <= 10) {
          if (innerIndex === 10) {
            dispatch({ type: FILE_PROGRESS, complete: 100, fname: item.fname });
            index++;
            clearInterval(tim);
            return resolve(index);
          }

          innerIndex++;
          dispatch({ type: FILE_PROGRESS, complete: innerIndex * 10, fname: item.fname });
        }
      }, 50);
    });
  }
  function recursiveLoop(list, index, dir, filetype, dispatch) {
    uploadFile(list, index, dir, filetype, dispatch)
      .then((val) => {
        index = val;
        if (index < list.length) recursiveLoop(list, index, dir, filetype, dispatch);
        else resolve('all done');
      });
  }
  return recursiveLoop(list, index, dir, filetype, dispatch);
});


const realUploadList = (list, index, dir, filetype, dispatch) => new Promise((resolve, reject) => {
  function uploadFile(list, index, dir, filetype, dispatch) {
    return new Promise((resolve) => {
      const item = list[index];
      if (item.enabled !== VALID_UPLOAD.Uploadable) return resolve(++index);
      const f = new FormData();
      f.append('items[]', JSON.stringify({ fname: item.fname, file_data: item.file_data }));
      f.append('dir', dir);
      f.append('filetype', filetype);
      const xhr = new XMLHttpRequest();

      xhr.addEventListener('progress', (e) => {
        if (e.lengthComputable) {
          const percentComplete = e.loaded / e.total * 100;
          dispatch({ type: FILE_PROGRESS, complete: e.loaded / e.total, fname: item.fname });
        }
      });

      xhr.addEventListener('load', (e) => {
        const obj = JSON.parse(e.currentTarget.response);
        if (!obj.hasOwnProperty('error')) dispatch({ type: FILE_PROGRESS, complete: 100, fname: item.fname });
        else dispatch({ type: FILE_PROGRESS, complete: obj.error, fname: item.fname });
        index++;
        return resolve(index);
      });
      xhr.addEventListener('error', (e) => {
        console.dir(e);
      });
      xhr.open('POST', `${_URL}do_upload`);
      xhr.send(f);
    });
  }
  function recursiveLoop(list, index, dir, filetype, dispatch) {
    uploadFile(list, index, dir, filetype, dispatch)
      .then((val) => {
        index = val;
        if (index < list.length) recursiveLoop(list, index, dir, filetype, dispatch);
        else resolve('all done');
      });
  }
  return recursiveLoop(list, index, dir, filetype, dispatch);
});


export const doUpload = (flist, dir, filetype) => (dispatch) => {
  dispatch(setUploadState(UPLOAD_IN_PROGRESS));
  uploadList(flist, 0, dir, filetype, dispatch)
    .then(() => dispatch(setUploadState(UPLOAD_COMPLETE)));
};

export const setUploadState = uploadState => ({
  type: SET_UPLOAD_STATE,
  uploadState,
});

export const addToUpload = item => ({
  type: ADD_UPLOADABLE,
  payload: item,
});

export const removeUploadable = index => ({
  type: REMOVE_UPLOADABLE,
  index,
});

/* emulate response from server - returns directory names where images are stored */
export function InitUploadPage(filetype) {
  return {
    type: INIT_UPLOAD_PAGE,
    directories: ['slideshow', 'recipes', 'ingredients'],
  };

  /*
    return dispatch=>{
        return fetch(ADMIN_URL+'image_directories/'+filetype, {method:'GET'})
        .then(res=>res.json())
        .then(res=>{
            dispatch({
                type: INIT_UPLOAD_PAGE,
                directories : res.directories
           });
        });
	}
	*/
}

export const SelectDirectory = selected => ({
  type: SELECT_DIRECTORY,
  selected,
});
