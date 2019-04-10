export const FREEHAND_POST_TYPE = 'FREEHAND_POST_TYPE';
export const NEWS_HEADLINE_POST_TYPE = 'NEWS_HEADLINE_POST_TYPE';
export const PORTRAIT_POST_TYPE = 'PORTRAIT_POST_TYPE';
export const TEXT_BOX_POST_TYPE = 'TEXT_BOX_POST_TYPE';
export const GALLERY_4_POST_TYPE = 'GALLERY_4_POST_TYPE';
export const MULTICOL_POST_TYPE = 'MULTICOL_2_POST_TYPE';
export const BIG_IMAGE_TYPE = 'BIG_IMAGE_TYPE';

export const ERROR_ALL_INPUTS = 'Please complete all fields';
export const ERROR_VALID_EMAIL = 'Please enter a valid email address';

export const _URL = 'http://localhost/bttc/public/';
export const API_URL = 'http://localhost/bttc/public/api/';
export const ADMIN_URL = `${_URL}admin/`;
export const ADMIN_API_URL = `${API_URL}admin/`;
export const ADMIN_URL_ELEM = `${ADMIN_URL}elem/`;
export const ADMIN_URL_GALLERY = `${ADMIN_URL}gallery/`;
export const ADMIN_URL_UTIL = `${ADMIN_URL}util/`;
export const ADMIN_URL_EDITORS = `${ADMIN_API_URL}users/`;
export const ADMIN_URL_TEMPLATES = `${ADMIN_URL}templates/`;
export const ADMIN_URL_MENU = `${ADMIN_API_URL}menu/`;
export const ADMIN_URL_PAGE = `${ADMIN_URL}page/`;
export const SITE_URL = 'http://01200.co.uk/bttc/public/';


export const LINK_TYPE_PAGE = 'LINK_TYPE_PAGE';
export const LINK_TYPE_DOC = 'LINK_TYPE_DOC';
export const LINK_TYPE_TEXT = 'LINK_TYPE_TEXT';


export const FETCH_HEADERS = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

export const FETCH_HEADERS_AUTH = () => ({ ...FETCH_HEADERS, authorization: `Bearer ${localStorage.getItem('token')}` });

export const IMAGE_REGEX = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
export const DOCS_REGEX = /(\.pdf|\.xls|\.doc)$/i;
export const VALID_UPLOAD = Object.freeze({
  Uploadable: 0, Cancelled: 1, 'Too Big': 2, 'Wrong Filetype': 3,
});
export const VALID_UPLOAD_DISPLAY = ['Ready', 'Cancelled', 'Too Big', 'Wrong Filetype'];
