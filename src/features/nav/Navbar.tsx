import React from 'react';
import { Menu, Container, Button } from 'semantic-ui-react';
import logo from '../../assets/logo.png';

interface Props {
  openCreateActivity: () => void;
}

const Navbar: React.FC<Props> = ({ openCreateActivity }) => {
  return (
    <Menu inverted fixed="top">
      <Container>
        <Menu.Item name="Reactivities">
          <img src={logo} alt="logo" style={{ marginRight: 10 }} />
          Reactivities
        </Menu.Item>
        <Menu.Item name="Activities" />
        <Menu.Item>
          <Button
            onClick={openCreateActivity}
            positive
            content="Create Activity"
          />
        </Menu.Item>
      </Container>
    </Menu>
  );
};

export default Navbar;
