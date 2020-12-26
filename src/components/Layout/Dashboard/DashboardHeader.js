import React from "react";

const DashboardHeader = (props) => (
  <div class="page-header d-print-none">
    <div class="row align-items-center">
      <div class="col">
        <div class="page-pretitle">
          Dashboard
        </div>
        <h2 class="page-title">
          Bellga.me
        </h2>
      </div>
      <div class="col-auto ms-auto d-print-none">
        <div class="btn-list">
          {props.createRoomFormContainer}
        </div>
      </div>
    </div>
  </div>
)

export default DashboardHeader;
