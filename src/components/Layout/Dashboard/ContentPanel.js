import React from "react";

const ContentPanel = (props) => (
  <div class="card" style={{height: "calc(14rem + 10px)"}}>
    <div class="card-body">
      {props.children}
    </div>
  </div>
)

export default ContentPanel;
