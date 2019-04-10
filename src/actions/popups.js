import { ADMIN_URL_GALLERY } from '../consts';

export const OPEN_POPUP = 'OPEN_POPUP';
export const CLOSE_POPUP = 'CLOSE_POPUP';
export const FREEHAND_POST_TYPE = 'FREEHAND_POST_TYPE';
export const TEXT_BOX_POST_TYPE = 'TEXT_BOX_POST_TYPE';
export const BIG_IMAGE_TYPE = 'BIG_IMAGE_TYPE';
export const GALLERY_IMAGE_TYPE = 'GALLERY_IMAGE_TYPE';
export const TEXTBOX_IMAGE_TYPE = 'TEXTBOX_IMAGE_TYPE';
export const MASTER_POPUP = 'MASTER_POPUP';
export const FREEHAND_POPUP = 'FREEHAND_POPUP';
export const TEXTBOX_POPUP = 'TEXTBOX_POPUP';
export const IMAGE_MASTER_POPUP = 'IMAGE_MASTER_POPUP';
export const BIG_IMAGE_POPUP = 'BIG_IMAGE_POPUP';
export const GET_IMAGE_LIST = 'GET_IMAGE_LIST';
export const IMAGE_SELECTOR_POPUP = 'IMAGE_SELECTOR_POPUP';
export const IMAGE_DELETE_POPUP = 'IMAGE_DELETE_POPUP';
export const LINK_SELECTOR_POPUP = 'LINK_SELECTOR_POPUP';
export const SET_IMAGE_LIST_INDEX = 'SET_IMAGE_LIST_INDEX';
export const SELECT_IMAGE = 'SELECT_IMAGE';


export const ACTION_EDITING_POPUP = 'EDITING_POPUP';
export const ADD_POPUP = 'ADD_POPUP';
export const DELETE_POPUP = 'DELETE_POPUP';
export const DELETE_EDITOR_POPUP = 'DELETE_EDITOR_POPUP';

export const POPUP_PRESET_FOR_TESTING = 'POPUP_PRESET_FOR_TESTING';

export const showMasterPopup = () => ({
  type: OPEN_POPUP,
  popup: MASTER_POPUP,
  popup_action: ACTION_EDITING_POPUP,
});

export const showImagesListPopup = list => ({
  type: OPEN_POPUP,
  image_root: list.root,
  image_list: list.list,
  popup: IMAGE_SELECTOR_POPUP,
  popup_action: ACTION_EDITING_POPUP,
});

export const openPopup = (popup_action, popup) => {
  if ((popup !== BIG_IMAGE_TYPE) && (popup !== GALLERY_IMAGE_TYPE) && (popup !== TEXTBOX_IMAGE_TYPE)) {
    return {
      type: OPEN_POPUP,
      popup_action,
      popup,
    };
  }
  return dispatch => fetch(ADMIN_URL_GALLERY + popup,
    {
      method: 'GET',
    })
    .then(res => res.json())
    .then(res => dispatch(showImagesListPopup(res)));
};

export const closePopup = () => ({
  type: CLOSE_POPUP,
});

export const setImageListIndex = index => ({
  type: SET_IMAGE_LIST_INDEX,
  index,
});

export function PresetForTesting(preset) {
  return {
    type: POPUP_PRESET_FOR_TESTING,
    preset,
  };
}
