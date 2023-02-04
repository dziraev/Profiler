import { useSelector } from 'react-redux';
import { selectLinkIsClicked } from '../pages/PersonalDetails/selectors';
import { useRef } from 'react';
export const useLinkIsClicked = () => {
  const linkIsClicked = useSelector(selectLinkIsClicked);
  const hrefLinkIsClicked = useRef(linkIsClicked);
  hrefLinkIsClicked.current = linkIsClicked;
  return hrefLinkIsClicked;
};
