import React, { FC, useState, ChangeEvent, KeyboardEvent, ReactElement, useEffect, useRef } from 'react'
import classNames from 'classnames'
import Input, { InputProps } from '../Input/input'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'


interface DataSourceObject {
  value: string;
}
export type DataSourceType<T = {}> = (T & DataSourceObject)
export interface AutoCompleteProps extends Omit<InputProps, 'onSelect'> {
  /**
   * 返回输入建议的方法，可以拿到当前的输入，然后返回同步的数组或者是异步的 Promise
   * type DataSourceType<T = {}> = T & DataSourceObject
   */
  fetchSuggestions: (str: string) => DataSourceType[] | Promise<DataSourceType[]>;
  /** 点击选中建议项时触发的回调*/
  onSelect?: (item: DataSourceType) => void;
  /** 文本框发生改变的时候触发的事件*/
  //onChange?: (value: string) => void;
  /**支持自定义渲染下拉项，返回 ReactElement */
  renderOption?: (item: DataSourceType) => ReactElement;
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => { 

  const { 
    fetchSuggestions,
    onSelect,
    value,
    renderOption,
    ...restProps
  } = props

  const [inputValue, setInputValue] = useState(value as string)
  
  const [suggestions, setSuggestions] = useState<DataSourceType[]>([])
  const [loading, setLoading] = useState(false)
  const [highlightIndex,setHighlightIndex] = useState(-1)
  const triggerSearch = useRef(false)
  const componentRef = useRef<HTMLDivElement>(null)
  const debouncedValue = useDebounce(inputValue, 500)
  useClickOutside(componentRef,() => {
    setSuggestions([])
  })
  useEffect(() => {
    if (debouncedValue && triggerSearch.current) {
      const results = fetchSuggestions(debouncedValue)
      if (results instanceof Promise) { 
        console.log("triggered");
        setLoading(true)
        results.then(data => { 
          setLoading(false)
          setSuggestions(data)
        })
      } else {
        setSuggestions(results)       
      }
    } else {
      setSuggestions([])
    }
    setHighlightIndex(-1)
  }, [debouncedValue])

  const highlight = (index: number) => {
    if (index < 0) index = 0
    if (index >= suggestions.length) {
      index = suggestions.length - 1
    }
    console.log(index);
    
    setHighlightIndex(index)
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    console.log(e.keyCode);
    
    switch (e.keyCode) {
      case 13://回车
        if (suggestions[highlightIndex]) { 
          handleSelect(suggestions[highlightIndex])
        }
        break
      case 38: //方向键 up
        highlight(highlightIndex - 1)
        break
      case 40: //方向键 down
        highlight(highlightIndex + 1)       
        break
      case 27:// esc
        setSuggestions([])
        break
      default:
        break
    }
  }
  
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim()
    setInputValue(value)
    triggerSearch.current = true
  }
  const handleSelect = (item: DataSourceType) => {
    setInputValue(item.value)
    setSuggestions([])
    if (onSelect) {
      onSelect(item)
    }
    triggerSearch.current = false
  }

  const renderTemplate = (item:DataSourceType) => {
    return renderOption ? renderOption(item) : item.value
  }

  const generateDropdown = () => {
    return (
      <ul className='mx-suggestion-list'>
        {
          suggestions?.map((item, index) => { 
            const cnames = classNames('suggestion-item', {
              'is-active': index === highlightIndex
            })
            return (
              <li key={index} className={ cnames } onClick={ () => handleSelect(item)}>
                { renderTemplate(item) }
              </li>
            )
          })
        }
      </ul>
    )
  }


  
  return (
    <div className="mx-auto-complete" ref={ componentRef }>
      <Input value={inputValue} onChange={handleChange} onKeyDown={ handleKeyDown } {...restProps}></Input>
      { loading && <ul><Icon icon="spinner" spin></Icon></ul>}
      {(suggestions?.length > 0) && generateDropdown()}
    </div>
  )
}