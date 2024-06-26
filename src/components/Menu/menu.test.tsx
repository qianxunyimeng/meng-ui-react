/* eslint-disable testing-library/await-async-utils,testing-library/prefer-screen-queries,testing-library/prefer-presence-queries,testing-library/no-node-access,testing-library/no-container,testing-library/render-result-naming-convention,testing-library/no-render-in-setup,testing-library/no-wait-for-multiple-assertions*/

import React from "react";
import { render,RenderResult,screen,fireEvent ,waitFor, cleanup} from "@testing-library/react"
import { MenuProps } from "./menu";
import Menu from "./menu";
import MenuItem from "./menuItem";
import SubMenu from "./subMenu";

jest.mock('../Icon/icon', () => {
  return () => {
    return <i className="fa" />
  }
})
jest.mock('react-transition-group', () => {
  return {
    CSSTransition: (props: any) => {
      return props.children
    }
  }
})

const testProps: MenuProps = {
  defaultIndex: "0",
  onSelect: jest.fn(),
  className: "test"
}

const testVerProps: MenuProps = { 
  defaultIndex: "0",
  mode: "vertical",
  defaultOpenSubMenus:["4"]
  
}

const generateMenu = (props:MenuProps) => {
  return (
    <Menu {...props}>
      <MenuItem>active</MenuItem>
      <MenuItem disabled>disabled</MenuItem>
      <MenuItem>xyz</MenuItem>
      <SubMenu title='dropdown'>
          <MenuItem>drop1</MenuItem>
      </SubMenu>

      <SubMenu title="opened">
        <MenuItem>
          opened1
        </MenuItem>
      </SubMenu>
    </Menu>
  )
}

const createStyleFile = () => {
  const cssFile: string = `
    .mx-submenu {
      display: none;
    }
    .mx-submenu.menu-opened {
      display:block;
    }
  `
  const style = document.createElement('style')
  style.type = 'text/css'
  style.innerHTML = cssFile
  return style
}

let wrapper: RenderResult, wrapper2: RenderResult, menuElement: HTMLElement, activeElement: HTMLElement, disabledElement: HTMLElement


describe("test Menu and MenuItem Component",() => {
  beforeEach(() => {
    wrapper = render(generateMenu(testProps))
    wrapper.container.append(createStyleFile())
    menuElement= screen.getByTestId('test-menu')
    activeElement = screen.getByText('active')
    disabledElement = screen.getByText('disabled')
  })
  it("should render correct Menu and MenuItem bases on default", () => {
    
    expect(menuElement).toBeInTheDocument()

    expect(menuElement).toHaveClass("mx-menu test")

    expect(menuElement.querySelectorAll(":scope > li").length).toEqual(5)
    //expect(menuElement.getElementsByTagName("li").length).toEqual(3)

    expect(activeElement).toHaveClass("menu-item is-active")

    expect(disabledElement).toHaveClass("menu-item is-disabled")
  })

  it("click items should change active and call the right callback",() => {
    const thirdItem = screen.getByText('xyz')
    fireEvent.click(thirdItem)
    expect(thirdItem).toHaveClass('is-active')// 第三个 子元素 有class is-active
    expect(activeElement).not.toHaveClass('is-active')// 第一个 子元素 没有 class is-active
    expect(testProps.onSelect).toHaveBeenCalledWith('2')// onselcet参数是 2
    
    fireEvent.click(disabledElement)//测试禁用的子元素是否触发事件
    expect(disabledElement).not.toHaveClass('is-active')
    expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
  })

  it("should render vertical mode when mode is set to vertical",() => {
    cleanup()
    render(generateMenu(testVerProps))
    const menuElement = screen.getByTestId("test-menu")
    expect(menuElement).toHaveClass("menu-vertical")
  })

  it("should show dropdown items when hover on subMenu",async() => {
    expect(screen.queryByText("drop1")).not.toBeVisible()
    const dropdownElement = screen.getByText("dropdown")
    fireEvent.mouseEnter(dropdownElement)

    await waitFor(() => {
      expect(screen.queryByText("drop1")).toBeVisible()  
    })

    fireEvent.click(screen.getByText("drop1"))
    expect(testProps.onSelect).toHaveBeenCalledWith("3-0")

    fireEvent.mouseLeave(dropdownElement)
    await waitFor(() => {
      expect(screen.queryByText("drop1")).not.toBeVisible()  
    })


  })
})


describe('test Menu and MenuItem component in vertical mode', () => {
  beforeEach(() => {
    wrapper2 = render(generateMenu(testVerProps))
    wrapper2.container.append(createStyleFile())
  })
  it('should render vertical mode when mode is set to vertical', () => {
    const menuElement = screen.getByTestId('test-menu')
    expect(menuElement).toHaveClass('menu-vertical')
  })
  it('should show dropdown items when click on subMenu for vertical mode', () => {
    const dropDownItem = screen.queryByText('drop1')
    expect(dropDownItem).not.toBeVisible()
    fireEvent.click(screen.getByText('dropdown'))
    expect(dropDownItem).toBeVisible()
  })
  it('should show subMenu dropdown when defaultOpenSubMenus contains SubMenu index', () => {
    expect(screen.queryByText('opened1')).toBeVisible()
  })
})