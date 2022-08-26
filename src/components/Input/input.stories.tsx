import React from 'react'
import { ComponentStory, ComponentMeta, storiesOf } from '@storybook/react'
import Input from "./input"

const inputMeta: ComponentMeta<typeof Input> = {
  title: "Input",
  component: Input,
  decorators: [
    (Story) => (
      <div style={{ width: '350px' }}>
        <Story />
      </div>
    ),
  ],
}

export default inputMeta

const Template: ComponentStory<typeof Input> = (args) => (
  <Input {...args}></Input>  
)

export const Default = Template.bind({})
Default.args = {
  placeholder:"please input"
}
Default.storyName = "Input"

export const disabledInput = Template.bind({})
disabledInput.args = {
  placeholder:"disabled input",
  disabled:true
}
disabledInput.storyName = "禁用的Input"

export const CIcon = Template.bind({})
CIcon.args = {
  placeholder: 'input with icon',
  icon: 'search'
}
CIcon.storyName = '带图标的 Input'

export const DSizeInput = () => (
  <>
    <Input
      defaultValue="large size"
      size="lg"
    />
    <Input
      placeholder="small size"
      size="sm"
    />
  </>
)
DSizeInput.storyName = '大小不同的 Input'

export const EPandInput = () => (
  <>
    <Input
      defaultValue="prepend text"
      prepend="https://"
    />
    <Input
      defaultValue="google"
      append=".com"
    />
    
  </>
)

EPandInput.storyName = '带前后缀的 Input'

// storiesOf("Input component", module)
//   .add("Input", Default)
// .add("被禁用的 Input",disabledInput)