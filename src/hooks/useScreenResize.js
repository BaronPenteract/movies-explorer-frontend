import React from 'react';

import {
  WIDTH_L,
  WIDTH_S,
  ITEMS_TO_SHOW_L,
  ITEMS_TO_SHOW_M,
  ITEMS_TO_SHOW_S,
  ITEMS_TO_LOAD_L,
  ITEMS_TO_LOAD_M,
  ITEMS_TO_LOAD_S,
} from '../utils/constantsUseScreenResize';

export function useScreenResize() {
  const [screenWidth, setScreenWidth] = React.useState(WIDTH_L);
  const [itemsToShow, setItemsToShow] = React.useState(ITEMS_TO_SHOW_L);
  const [itemsToLoad, setItemsToLoad] = React.useState(ITEMS_TO_LOAD_L);

  React.useEffect(() => {
    setScreenWidth(window.screen.width);

    window.onresize = () => {
      setTimeout(() => {
        setScreenWidth(window.screen.width);
      }, 1000);
    };

    return () => {
      window.onresize = null;
    };
  }, []);

  React.useEffect(() => {
    if (screenWidth >= WIDTH_L) {
      setItemsToShow(ITEMS_TO_SHOW_L);
      setItemsToLoad(ITEMS_TO_LOAD_L);
    } else if (screenWidth >= WIDTH_S) {
      setItemsToShow(ITEMS_TO_SHOW_M);
      setItemsToLoad(ITEMS_TO_LOAD_M);
    } else if (screenWidth < WIDTH_S) {
      setItemsToShow(ITEMS_TO_SHOW_S);
      setItemsToLoad(ITEMS_TO_LOAD_S);
    }
  }, [screenWidth]);

  return { screenWidth, itemsToShow, itemsToLoad, setItemsToShow };
}
