import React, { Component } from 'react'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';

export default class Footer extends Component {

  constructor() {
    super()

    this.state = {
      isOpen: false
    }
  }
  render() {
    const { title } = this.props
    return (
      <footer>
        <Navbar className="navbar-dark" color="dark" expand="md">
          <NavLink href="https://www.facebook.com/christopher.j.mccormack">
            <i className="fab fa-facebook-f"></i>
          </NavLink>
          <NavLink href="https://twitter.com/chrisjmccormack">
            <i className="fab fa-twitter"></i>
          </NavLink>
          <NavLink href="https://www.linkedin.com/in/christopherjmccormack">
            <i className="fab fa-linkedin-in"></i>
          </NavLink>
          <NavLink href="https://github.com/cmccormack">
            <i className="fab fa-github"></i>
          </NavLink>
        </Navbar>
      </footer>
    )
  }
}