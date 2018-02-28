import React from 'react'

const Content = (props) => {

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
                  <tr key={v.region + v.service + v.ip_prefix}>
                    <td>{v.region}</td>
                    <td>{v.service}</td>
                    <td>{v.ip_prefix}</td>
                  </tr>
                )
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
}

export default Content