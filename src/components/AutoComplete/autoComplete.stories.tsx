import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { AutoComplete,DataSourceType } from "./autoComplete";

interface LakerPlayerProps {
  value: string;
  number?: number;
}

const SimpleComplete = () => {
  const lakers = ["bradley", "pope", "caruso", "cook", "james", "AD", "green", "howard", "kuzma"]
  
  const lakersWithNumber = [
    {value: "bradley",number: 11},
    {value: "pope",number: 1},
    {value: "caruso",number: 4},
    {value: "cook",number: 2},
    {value: "james",number: 15},
    {value: "AD",number: 23},
    {value: "green",number: 3},
    {value: "howard",number: 14},
    {value: "kuzma",number: 39},
  ]

  // const handleFetch = (query: string) => {
  //   return lakers.filter(name => name.includes(query)).map(name => ({value:name}))
  // }

  // const handleFetch = (query: string) => {
  //   return lakersWithNumber.filter(player => player.value.includes(query))
  // }

  const handleFetch = (query: string) => {
    return fetch(`https://api.github.com/search/users?q=${query}`)
      .then(res => res.json())
      .then(({ items }) => { 
        console.log(items);
        const formatItems = items.slice(0, 10).map((item:any) => ({value:item.login,...item}))
        return formatItems
      })
  }

  const renderOPtion = (item:DataSourceType<LakerPlayerProps>) => {
    return (
      <>
        <h2>Name: {item.value}</h2>
        <p>Number: { item.number }</p>
      </>
      
    )
  }
  return (
    <AutoComplete
      fetchSuggestions={handleFetch}
      onSelect={action('selected')}
      //renderOption={ renderOPtion}
    >

    </AutoComplete>
  )
}

storiesOf("AutoComplete Component", module)
.add("AutoComplete",SimpleComplete)