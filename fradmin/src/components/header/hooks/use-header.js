import { useState } from "react";
export default function useHeader() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sidenavOpen, setSidenavOpen] = useState(false);
  const [searchBarOpen, setSearchBarOpen] = useState(false);

  const toggleDialog = () => setDialogOpen(state => !state);

  const toggleSidenav = () => setSidenavOpen(state => !state);
  const toggleSidenavClickBtnMiniCart = (bool) => setSidenavOpen(bool);

  const toggleSearchBar = () => setSearchBarOpen(state => !state);

  return {
    dialogOpen,
    sidenavOpen,
    searchBarOpen,
    toggleDialog,
    toggleSidenav,
    toggleSearchBar,
    toggleSidenavClickBtnMiniCart
  };
}
