/* eslint-disable testing-library/await-async-utils,testing-library/prefer-screen-queries,testing-library/prefer-presence-queries,testing-library/no-node-access,testing-library/no-container*/

import React from 'react'
import { config } from 'react-transition-group'
import { render, fireEvent } from '@testing-library/react'

import Alert, { AlertProps } from './alert'
config.disabled = true

jest.mock('../Icon/icon', () => {
  return (props: any) => {
    return <span>{props.icon}</span>
  }
})

const testProps: AlertProps = {
  title: 'title',
  onClose: jest.fn()
}

const typeProps: AlertProps = {
  ...testProps,
  type: 'success',
  description: 'hello',
  closable: false
}
describe('test Alert Component', () => {
  it('should render the correct default Alert', () => {
    const { getByText, container, queryByText } = render(<Alert {...testProps}/>)
    expect(queryByText('title')).toBeInTheDocument()
    expect(container.querySelector('.mx-alert')).toHaveClass('mx-alert-default')
    fireEvent.click(getByText('times'))
    expect(testProps.onClose).toHaveBeenCalled()
    expect(queryByText('title')).not.toBeInTheDocument()
  })
  it('should render the correct Alert based on different type and description', () => {
    const { container, queryByText } = render(<Alert {...typeProps}/>)
    expect(queryByText('title')).toHaveClass('bold-title')
    expect(container.querySelector('.mx-alert')).toHaveClass('mx-alert-success')
    expect(queryByText('hello')).toBeInTheDocument()
    expect(queryByText('times')).not.toBeInTheDocument()
  })
})
