import React from 'react';

import Button, { ButtonType, ButtonSize } from './components/Button/button';

import Menu from './components/Menu/menu';
import MenuItem from './components/Menu/menuItem';
import SubMenu from './components/Menu/subMenu';

import Tabs from './components/Tabs/tabs';
import TabItem from './components/Tabs/tabItem';

import Icon from './components/Icon/icon';

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { solid } from '@fortawesome/fontawesome-svg-core/import.macro' // <-- import styles to be used

import { library } from '@fortawesome/fontawesome-svg-core'
// fas表示引入所有图标
import { fas } from '@fortawesome/free-solid-svg-icons'
//import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons'
library.add(fas)
function App() {
  
  return (
    <div className="App">
      <h1>hello world</h1>
      <code>
        const a = '123'
      </code>

      {/* <Icon icon={"coffee"} theme="primary" size="10x"></Icon>
      <Icon icon={"arrow-down"} theme="danger" size="10x"></Icon>
      <Icon icon={"arrow-up"} theme="danger" size="10x"></Icon> */}

      {/* <FontAwesomeIcon icon={solid('coffee')} size="10x"></FontAwesomeIcon> */}

      <Menu defaultIndex="0" onSelect={(index) => { alert(index) }} defaultOpenSubMenus={ ['2']}>
        <MenuItem >menu 1</MenuItem>
        <MenuItem>menu 2</MenuItem>
        <SubMenu title='dropdown'>
          <MenuItem>dropdown 1</MenuItem>
          <MenuItem>dropdown 2</MenuItem>
        </SubMenu>
        <MenuItem >menu 3</MenuItem>
      </Menu>

      <Tabs defaultIndex={1} type="line">
        <TabItem label={"card1"}>this is card one</TabItem>
        <TabItem label={"card2"}>this is content two</TabItem>
        <TabItem label={"card3"} disabled> this.is content three</TabItem>
      </Tabs>




      {/* <Button>确定</Button>
      <Button btnType={"primary"} size={"lg"} onClick={() => { alert('123')}}>确定</Button>
      <Button btnType="link" href="https://www.baidu.com" disabled>确定</Button> */}
    </div>
  );
}

export default App;
