import { createState } from '@hookstate/core';

const globalState = createState({
  isSideBarOpen: false,
});

export default globalState;
