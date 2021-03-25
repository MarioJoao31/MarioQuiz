import React from "react";
import { Dropdown, Menu } from "semantic-ui-react";

const MenuExampleDropdownItem = () => (
  <Menu vertical>
    <Dropdown item text='Dificuldade'>
      <Dropdown.Menu>
        <Dropdown.Item>Fácil</Dropdown.Item>
        <Dropdown.Item>Médio</Dropdown.Item>
        <Dropdown.Item>Díficil</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  </Menu>
);

export default MenuExampleDropdownItem;
