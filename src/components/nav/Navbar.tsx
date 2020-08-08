import React from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import { observer } from 'mobx-react-lite';
import { NavLink } from 'react-router-dom';

import ActivityStore from '../../store/activity.store';
import logo from '../../assets/logo.png';

const Navbar: React.FC = () => {
  const { openCreateActivityForm } = React.useContext(ActivityStore);
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item name="Reactivities" as={NavLink} exact to="/">
          <img src={logo} alt="logo" style={{ marginRight: 10 }} />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" as={NavLink} exact to="/activities" />
        <Menu.Item>
          <Button
            as={NavLink}
            exact
            to="/create-activity"
            positive
            content="Create Activity"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default observer(Navbar);
