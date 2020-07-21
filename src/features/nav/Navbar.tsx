import React from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import logo from '../../assets/logo.png';

const Navbar: React.FC = () => {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item name="Reactivities">
          <img src={logo} alt="logo" style={{ marginRight: 10 }} />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button positive content="Create Activity" />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Navbar;
