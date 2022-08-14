import React from 'react';

import Button, { ButtonType, ButtonSize } from './components/Button/button';

import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';

function App() {
  
  return (
    <div className="App">
      <h1>hello world</h1>
      <code>
        const a = '123'
      </code>

      <Menu defaultIndex="0" mode="vertical" onSelect={(index) => { alert(index) }} defaultOpenSubMenus={ ['2']}>
        <MenuItem >menu 1</MenuItem>
        <MenuItem>menu 2</MenuItem>
        <SubMenu title='dropdown'>
          <MenuItem>dropdown 1</MenuItem>
          <MenuItem>dropdown 2</MenuItem>
        </SubMenu>
        <MenuItem >menu 3</MenuItem>
      </Menu>


      {/* <Button>确定</Button>
      <Button btnType={"primary"} size={"lg"} onClick={() => { alert('123')}}>确定</Button>
      <Button btnType="link" href="https://www.baidu.com" disabled>确定</Button> */}
    </div>
  );
}

export default App;
