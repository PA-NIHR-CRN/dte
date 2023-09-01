import React, { useContext } from "react";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { IconButton } from "@material-ui/core";
import { Mail } from "@material-ui/icons";
import { StyledMenu } from "../StyledMenu/StyledMenu";
import ListItemLink from "../ListItemLink/ListItemLink";
import { AuthContext } from "../../../context/AuthContext";

function UserMenu() {
  const { isAuthenticated } = useContext(AuthContext);
  const [anchorElement, setAnchorElement] = React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorElement);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElement(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorElement(null);
  };

  const menuId = "primary-search-account-menu";
  const userMenu = (
    <StyledMenu
      anchorEl={anchorElement}
      //   anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      id={menuId}
      keepMounted
      //   transformOrigin={{ vertical: "top", horizontal: "center" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {!isAuthenticated() ? (
        <>
          <ListItemLink to="/UserLogin" primary="Login" icon={<AccountCircle />} onClick={handleMenuClose} key="" />
          <ListItemLink
            to="/UserRegistration"
            primary="Create Account"
            icon={<AccountCircle />}
            onClick={handleMenuClose}
            key=""
          />
        </>
      ) : (
        <>
          <ListItemLink
            to="/LogoutRedirect"
            primary="Logout"
            icon={<AccountCircle />}
            onClick={handleMenuClose}
            key=""
          />
          <ListItemLink
            to="/Participants/MyDetails/"
            primary="My Account"
            icon={<AccountCircle />}
            onClick={handleMenuClose}
            key="My Account"
          />
          <ListItemLink
            to="//Participants/Inbox/"
            primary="Inbox"
            icon={<Mail />}
            onClick={handleMenuClose}
            key="Inbox"
          />
        </>
      )}
    </StyledMenu>
  );

  return (
    <>
      <IconButton
        edge="end"
        aria-label="account of current user"
        // aria-controls= {primary-search-account-menu}
        aria-haspopup="true"
        onClick={handleProfileMenuOpen}
        color="primary"
      >
        <AccountCircle />
      </IconButton>
      {userMenu}
    </>
  );
}

export default UserMenu;
