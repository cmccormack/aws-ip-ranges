import React, { Component } from 'react'
import ReactDOM from 'react-dom'

var url = "https://ip-ranges.amazonaws.com/ip-ranges.json";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      regions: [],
      services: [],
      prefixes: [],
      region: "Any Region",
      service: "Any Service",
      disableClear: true,
      visibleTab: 'complete',
      activePrefixes: []
    };
    this.handleDropdownClick = this.handleDropdownClick.bind(this)
    this.handleClearClick = this.handleClearClick.bind(this)
    this.handleTabClick = this.handleTabClick.bind(this)
    this.getActivePrefixes = this.getActivePrefixes.bind(this)
  }

  componentDidMount() {
    var regions = [],
      services = [],
      prefixes = [];

    $.getJSON(url, data => {
      prefixes = data.prefixes;
      for (let i in prefixes) {
        if (regions.indexOf(prefixes[i].region) === -1) {
          regions.push(prefixes[i].region);
        }
        if (services.indexOf(prefixes[i].service) === -1) {
          services.push(prefixes[i].service);
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
    return this.props === nextProps && this.state === nextState ? false : true;
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
    }, this.update);
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
    );
  }
}

function InputBar(props) {
  return (
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
  );
}

function Dropdown(props) {
  const type = props.id;

  function handleClick(e) {
    props.handleDropdownClick(e.target.dataset.type, e.target.textContent);
  }

  return (
    <div className="col-sm-4">
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id={"dropdownMenuButton-" + type}
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        role="group"
      >
        {props.title}
      </button>
      <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {props.items.map(item =>
          <button
            className="dropdown-item"
            type="button"
            onClick={handleClick}
            data-type={type}
          >
            {item}
          </button>
        )}
      </div>
    </div>
  )
}

function TabGroup(props) {

  var tabs = [
    {
      text: 'Complete',
      class: 'active',
      href: '#complete',
      id: 'complete',

    },
    {
      text: 'Prefixes Only',
      class: '',
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
            handleTabClick={props.handleTabClick}
            {...v}
          />
        )
      })}
    </ ul>
  )
}

function TabGroupItem(props) {

  function handleClick() {
    props.handleTabClick(props.id)
  }

  return (
    <li className={"nav-item"}>
      <a
        className={`nav-link ${props.class}`}
        href={'#'}
        id={`tab-${props.id}`}
        onClick={handleClick}
        role="tab"
        data-toggle="tab"
      >
        {props.text}
      </a>
    </li>
  )
}

function ContentPanel(props) {

  return (
    <div
      id="display-nav-content"
      className="tab-content"
    >
      <ContentPanelTab {...props} />
    </div>
  )
}

function ContentPanelTab(props) {

  return (
    <div
      role="tabpanel"
      className="tab-pane fade show active"
      id={props.visibleTab}
    >
      <Content {...props} />
    </div>
  )
}

function Content(props) {

  if (props.visibleTab === 'complete') {
    return (
      <div className="results row" style={{ marginTop: "30px" }}>

        <div className="col">
          <div className='text-muted text-right'>{`${props.data.length} items found.`}</div>
          <table className="table-sm table-striped">
            <thead className="thead-inverse">
              <tr>
                <th>Region</th>
                <th>Service</th>
                <th>Prefix</th>
              </tr>
            </thead>
            <tbody>
              {props.data.map(v => {
                return (
                  <tr>
                    <td>{v.region}</td>
                    <td>{v.service}</td>
                    <td>{v.ip_prefix}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    )
  } else if (props.visibleTab === 'prefixes') {

    var data = props.data.map((v) => v.ip_prefix)

    return (
      <div>
        <div className="results row" style={{ marginTop: "30px" }}>
          <div className="col-sm-6">
            <div className='text-muted text-right'>{`${data.length} items found.`}</div>
            <textarea
              className="outputDiv"
              onFocus={handleFocus}
              readOnly
              value={data.join('\n')}
              rows={data.length > 15 ? 15 : data.length}
            />
          </div>
        </div>
        <div className="row">
          <div className='col-sm-6 buttons'>
            <button
              className="btn btn-block btn-success"
              id="clipboard"
              onClick={handleCopyClick}
              type="button"
            >
              {"Copy to Clipboard"}
            </button>
          </div>
        </div>
      </div>
    )
  }

  function handleCopyClick() {

    var output = document.getElementsByClassName('outputDiv')[0]
    output.select()
    try {
      var successful = document.execCommand('copy')
      var msg = successful ? 'successful' : 'unsuccessful'
      console.log('Copying text command was ' + msg)
    } catch (err) {
      console.log('Copying text command was unsuccessful')
    }
  }

  function handleFocus(event) {
    event.target.select()
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
