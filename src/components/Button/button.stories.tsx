import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'
//import WelcomeMDX from '../Welcome/Welcome.stories.mdx'
import Button from './button'
//import mdx from "./button.mdx"

const buttonMeta: ComponentMeta<typeof Button> = {
  title: "Button",
  component:Button
}

export default buttonMeta

// export const Default: ComponentStory<typeof Button> = (args) => (
//   <Button {...args}>Default Button</Button>
// )
// Default.storyName = "默认按钮样式"

const Template: ComponentStory<typeof Button> = (args) => (
  <Button {...args}></Button>  
)

export const Default = Template.bind({})
Default.args = {
  children: "Default Button"
}
Default.storyName = "默认按钮样式"
Default.decorators = [
  (Story) => (
    <div style={{margin:"50px"}}><Story></Story></div>
  )
]

export const Large = Template.bind({})
Large.args = {
  size: 'lg',
  children: 'Large Button',
}
export const Small = Template.bind({})
Small.args = {
  size: 'sm',
  children: 'Small Button',
}
export const Primary = Template.bind({})
Primary.args = {
  btnType: 'primary',
  children: 'Primary Button',
}
export const Danger = Template.bind({})
Danger.args = {
  btnType: 'danger',
  children: 'Danger Button',
}
export const Link = Template.bind({})
Link.args = {
  btnType: 'link',
  children: 'Link Button',
  href: 'https://google.com'
}

// export const ButtonWithSize: ComponentStory<typeof Button> = () => {
//   return (
//     <>
//       <Button size="lg">large button</Button>
//       <Button size="sm">small button</Button>
//     </>
//   )
// }
// ButtonWithSize.storyName = "不同尺寸的按钮"

// export const ButtonWithType: ComponentStory<typeof Button> = () => {
//   return (
//     <>
//       <Button btnType="primary">large button</Button>
//       <Button btnType="danger">danger button</Button>
//       <Button btnType="link" href="https://www.baidu.com">link button</Button>

//     </>
//   )
// }
// ButtonWithType.storyName = "不同类型的按钮"
