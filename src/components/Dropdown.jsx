import React, { Component } from 'react'

const Dropdown = ({id, title, items, ...props}) => {

  const handleClick = (e) => {
    props.handleDropdownClick(e.target.dataset.type, e.target.textContent);
  }

  return (
    <div className="col-sm-4">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id={"dropdownMenuButton-" + id}
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        role="group"
      >
        {title}
      </button>
      <div
        aria-labelledby="dropdownMenuButton"
        className="dropdown-menu"
      >
        {items.map(item =>
          <button
            className="dropdown-item"
            data-type={id}
            key={id+item}
            onClick={handleClick}
            type="button"
          >
            {item}
          </button>
        )}
      </div>
    </div>
  )
}

export default Dropdown
