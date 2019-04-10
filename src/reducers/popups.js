import * as POPUP_ACTIONS from '../actions/popups';
import { initPopup } from './initialise';

const initialState = initPopup();

function makePopupStack(popstack, current) {
  const _popstack = popstack.slice();
  if ((_popstack.length) && ((_popstack[_popstack.length - 1] === POPUP_ACTIONS.MASTER_POPUP) || (_popstack[_popstack.length - 1] === POPUP_ACTIONS.IMAGE_MASTER_POPUP))) _popstack.pop();
  return [..._popstack, current];
}


export default function popupReducer(state = initialState, action) {
  switch (action.type) {
    case POPUP_ACTIONS.OPEN_POPUP:
      switch (action.popup_action) {
        case POPUP_ACTIONS.ACTION_EDITING_POPUP:
          switch (action.popup) {
            case POPUP_ACTIONS.MASTER_POPUP:
            case POPUP_ACTIONS.IMAGE_MASTER_POPUP:
              return { ...state, popup_stack: makePopupStack(state.popup_stack, action.popup) };
            case POPUP_ACTIONS.FREEHAND_POST_TYPE:
              return { ...state, popup_stack: makePopupStack(state.popup_stack, POPUP_ACTIONS.FREEHAND_POPUP) };
            case POPUP_ACTIONS.TEXT_BOX_POST_TYPE:
              return { ...state, popup_stack: makePopupStack(state.popup_stack, POPUP_ACTIONS.TEXTBOX_POPUP) };
            case POPUP_ACTIONS.BIG_IMAGE_TYPE:
              return { ...state, popup_stack: makePopupStack(state.popup_stack, POPUP_ACTIONS.BIG_IMAGE_POPUP) };
            case POPUP_ACTIONS.LINK_SELECTOR_POPUP:
              return { ...state, popup_stack: makePopupStack(state.popup_stack, POPUP_ACTIONS.LINK_SELECTOR_POPUP) };
            case POPUP_ACTIONS.IMAGE_SELECTOR_POPUP:
              return {
                ...state,
                image_list: action.image_list,
                image_root: action.image_root,
                image_list_index: 0,
                popup_stack: makePopupStack(state.popup_stack, POPUP_ACTIONS.IMAGE_SELECTOR_POPUP),
              };
            case POPUP_ACTIONS.DELETE_POPUP:
            case POPUP_ACTIONS.DELETE_EDITOR_POPUP:
            case POPUP_ACTIONS.ADD_POPUP:
            case POPUP_ACTIONS.IMAGE_DELETE_POPUP:
              return { ...state, popup_stack: makePopupStack(state.popup_stack, action.popup) };
            default:
              return state;
          }
        default:
          return state;
      }
    case POPUP_ACTIONS.SET_IMAGE_LIST_INDEX:
      return { ...state, image_list_index: action.index };
    case POPUP_ACTIONS.CLOSE_POPUP:
      return { ...state, popup_stack: state.popup_stack.slice(0, state.popup_stack.length - 1) };
    case POPUP_ACTIONS.POPUP_PRESET_FOR_TESTING:
      return action.preset;
    default:
      return state;
  }
}
