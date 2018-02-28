import React, { Component } from 'react'

import {
  Dropdown
} from './'

const InputBar = (props) => (
  <div className="row text-center">
    <Dropdown
      id="region"
      title={props.region}
      items={props.regions}
      handleDropdownClick={props.handleDropdownClick}
    />
    <Dropdown
      id="service"
      title={props.service}
      items={props.services}
      handleDropdownClick={props.handleDropdownClick}
    />
    <div className={"col-sm-4"}>
      <button
        type="button"
        role="group"
        className={`btn btn-danger ${props.disableClear && 'disabled'}`}
        onClick={props.handleClearClick}
      >
        {"Clear"}
      </button>
    </div>
  </div>
)

export default InputBar
