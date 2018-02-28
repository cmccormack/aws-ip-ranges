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

export default class Header extends Component {

  constructor() {
    super()

    this.state = {
      isOpen: false
    }
  }
  render() {
    const { title } = this.props
    return (
      <header>
        <Navbar className="navbar-dark" color="dark" expand="md">
          <NavbarBrand href="/">
            <i className="fa fa-cloud badge-icon"></i>
            {title}
          </NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="/">Portfolio</NavLink>
              </NavItem>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret>
                  Other Utilities
                </DropdownToggle>
                <DropdownMenu >
                  <DropdownItem>
                    <a href="/pomodoro">Pomodoro Timer</a>
                  </DropdownItem>
                  <DropdownItem>
                    <a href="/calculator">Calculator</a>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
      </header>
    )
  }
}