import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import {
  InputBar,
  TabGroup,
  ContentPanel,
  Header,
  Footer
} from './components'

var url = "https://ip-ranges.amazonaws.com/ip-ranges.json"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      regions: [],
      services: [],
      prefixes: [],
      region: "Any Region",
      service: "Any Service",
      disableClear: true,
      visibleTab: 'complete',
      activePrefixes: []
    }
    this.handleDropdownClick = this.handleDropdownClick.bind(this)
    this.handleClearClick = this.handleClearClick.bind(this)
    this.handleTabClick = this.handleTabClick.bind(this)
    this.getActivePrefixes = this.getActivePrefixes.bind(this)
  }

  componentDidMount() {
    var regions = [],
      services = [],
      prefixes = []

    $.getJSON(url, data => {
      prefixes = data.prefixes
      for (let i in prefixes) {
        if (regions.indexOf(prefixes[i].region) === -1) {
          regions.push(prefixes[i].region)
        }
        if (services.indexOf(prefixes[i].service) === -1) {
          services.push(prefixes[i].service)
        }
      }
      this.setState({
        regions: regions,
        services: services,
        prefixes: prefixes,
        activePrefixes: prefixes
      })
    })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props === nextProps && this.state === nextState ? false : true
  }

  handleDropdownClick(type, value) {
    this.setState({
      [type]: value,
      disableClear: false
    }, this.update)
  }

  handleClearClick() {
    var region = 'Any Region',
      service = 'Any Service'

    this.setState({
      region: region,
      service: service,
      disableClear: true
    }, this.update)
  }

  update() {
    var activePrefixes = this.getActivePrefixes(this.state.region, this.state.service)

    this.setState({ activePrefixes: activePrefixes })
  }

  handleTabClick(visibleTab) {
    this.setState({ visibleTab })
  }

  getActivePrefixes(region, service) {
    return this.state.prefixes.filter(
      v =>
        (v.region === region ||
          region === "Any Region") &&
        (v.service === service ||
          service === "Any Service")
    )
  }

  render() {

    return (
      <div className="container">
        <Header 
          title={'AWS IP Prefix Lookup'}
        />
        <div className="main">
          <InputBar
            {...this.state}
            handleClearClick={this.handleClearClick}
            handleDropdownClick={this.handleDropdownClick}
          />
          <TabGroup handleTabClick={this.handleTabClick} />
          <ContentPanel
            data={this.state.activePrefixes}
            visibleTab={this.state.visibleTab}
          />
        </div>
        <Footer />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById("root"))
