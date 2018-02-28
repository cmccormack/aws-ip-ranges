import React from 'react'
import {
  TabGroupItem
} from './'

const TabGroup = ({ handleTabClick }) => {

  var tabs = [
    {
      text: 'Complete',
      className: 'active',
      href: '#complete',
      id: 'complete',

    },
    {
      text: 'Prefixes Only',
      className: '',
      href: '#prefixes',
      id: 'prefixes'
    }
  ]

  return (
    <ul
      id="output-nav"
      className="nav nav-tabs"
      role="tablist"
    >
      {tabs.map((v) => {
        return (
          <TabGroupItem
            handleTabClick={handleTabClick}
            key={v.id}
            {...v}
          />
        )
      })}
    </ ul>
  )
}

export default TabGroup