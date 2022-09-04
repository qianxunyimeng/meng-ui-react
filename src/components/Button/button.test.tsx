/* eslint-disable testing-library/await-async-utils,testing-library/prefer-screen-queries,testing-library/prefer-presence-queries,testing-library/no-node-access,testing-library/no-container,testing-library/render-result-naming-convention,testing-library/no-render-in-setup,testing-library/no-wait-for-multiple-assertions*/

import React from "react";
import { render,screen,fireEvent } from "@testing-library/react"
import Button, { ButtonProps } from "./button"


const defaultProps = {
  onClick: jest.fn()
}

const testProps: ButtonProps = {
  btnType: "primary",
  size: "lg",
  className: 'klass'
}

const disabledProps: ButtonProps = {
  disabled: true,
  onClick: jest.fn(),
}


// test("first react test case",() => {
//   render(<Button>Nice</Button>)
//   const element = screen.queryByText("Nice")
//   expect(element).toBeTruthy()
//   expect(element).toBeInTheDocument()
// })

describe("test Button component",() => {
  it("should render the correct default button",() => {
    render(<Button {...defaultProps}>Nice</Button>)
    const element = screen.getByText("Nice") as HTMLButtonElement//queryByText
    //expect(element).toBeTruthy()
    //是否挂在到文档中
    expect(element).toBeInTheDocument()

    expect(element.tagName).toEqual('BUTTON')

    expect(element).toHaveClass("mx-btn btn-default")

    expect(element.disabled).toBeFalsy()
    
    fireEvent.click(element)//出发点击事件
    expect(defaultProps.onClick).toHaveBeenCalled()//是否捕捉到点击事件
  })

  it("should render the correct based on different props",() => {
    render(<Button {...testProps}>Nice</Button>)
    const element = screen.getByText('Nice')
    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('btn-primary btn-lg klass')
  })

  it("should render a link when btnType equals link",() => {
    render(<Button btnType={ "link"} href="http://dummyurl">Link</Button>)
    const element = screen.getByText('Link')
    expect(element).toBeInTheDocument()
    expect(element.tagName).toEqual('A')
    expect(element).toHaveClass('mx-btn btn-link')
  })

  test("should render disabled button when disabled set to true",() => {
    render(<Button {...disabledProps}>Nice</Button>)
    const element = screen.getByText('Nice') as HTMLButtonElement
    expect(element).toBeInTheDocument()
    expect(element.disabled).toBeTruthy()
    fireEvent.click(element)
    expect(disabledProps.onClick).not.toHaveBeenCalled()
  })
})