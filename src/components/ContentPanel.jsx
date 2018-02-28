import React from 'react'

import { Content } from './'

const ContentPanelTab = (props) => (
  <div
    role="tabpanel"
    className="tab-pane fade show active"
    id={props.visibleTab}
  >
    <Content {...props} />
  </div>
)


const ContentPanel = (props) => (
  <div
    id="display-nav-content"
    className="tab-content"
  >
    <ContentPanelTab {...props} />
  </div>
)


export default ContentPanel