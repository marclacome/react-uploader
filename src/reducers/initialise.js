import { UPLOAD_NONE } from '../actions/file_upload';

export function initPopup() {
  return {
    popup_stack: [], image_root: '', image_list: [], image_list_index: -1, max_images: 12,
  };
}
export function initFileUpload() {
  return {
    upload_state: UPLOAD_NONE, upload_ar: [], directories: [], selected_directory: '',
  };
}
