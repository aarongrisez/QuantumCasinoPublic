import React from "react";
import DashboardHeader from "./DashboardHeader";
import ContentPanel from "./ContentPanel";

const DashboardLayout = (props) => (
  <div class="content">
    <div class="container-fluid">
      <DashboardHeader 
        createRoomFormContainer = {props.createRoomFormContainer} 
      />

      <div class="row row-deck row-cards">
        <div class="col-lg-6">
          <div class="row row-cards">
            <div class="col-12">
              <ContentPanel />
            </div>
          </div>
        </div>

        <div class="col-lg-6">
          <div class="row row-cards">
            <div class="col-12">
              <ContentPanel />
            </div>
          </div>
        </div>


        <div class="col-md-4">
          <div class="card" style={{height: "calc(24rem + 10px)"}}>
            <div class="card-body card-body-scrollable card-body-scrollable-shadow">
            </div>
          </div>
        </div>

        <div class="col-md-8">
          <div class="card" style={{height: "calc(24rem + 10px)"}}>
            <div class="card-body card-body-scrollable card-body-scrollable-shadow">
              {props.roomListContainer}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default DashboardLayout;
