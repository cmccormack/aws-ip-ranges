import React from 'react'

const TabGroupItem = ({ id, text, className, ...props }) => {

  function handleClick() {
    props.handleTabClick(id)
  }

  return (
    <li className={"nav-item"}>
      <a
        className={`nav-link ${className}`}
        href={'#'}
        id={`tab-${id}`}
        onClick={handleClick}
        role="tab"
        data-toggle="tab"
      >
        {text}
      </a>
    </li>
  )
}

export default TabGroupItem