import React, { FunctionComponent } from "react";
import ListItem from "@material-ui/core/ListItem";

import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { Omit } from "@material-ui/types";
import { Link as RouterLink, LinkProps as RouterLinkProps } from "react-router-dom";

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
  onClick: React.MouseEventHandler<HTMLAnchorElement>;
}

const ListItemLink: FunctionComponent<ListItemLinkProps> = (props) => {
  const { icon, primary, to, onClick } = props;
  const renderLink = React.useMemo(
    () =>
      React.forwardRef<any, Omit<RouterLinkProps, "to">>((itemProps, ref) => (
        // eslint-disable-next-line react/jsx-props-no-spreading
        <RouterLink to={to} innerRef={ref} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink} onClick={onClick}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
};

ListItemLink.defaultProps = { icon: undefined };

export default ListItemLink;
