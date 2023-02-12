export const navigationLinkPopUp = (link, dispatch, navigate) => {
  if (dispatch && navigate && link === '/auth') {
    localStorage.removeItem('token');
    dispatch({ type: 'USER_LOGOUT' });
  }
  if (dispatch && navigate && link) {
    navigate(link);
  }
};
