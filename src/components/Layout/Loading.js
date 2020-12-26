import React from "react";
import loading from "../../assets/loading.svg";
import "./Loading.css"

const Loading = () => (
  <div class="container-sm wrapper">
    <div class="card">
      <div class="card-body p-4 py-5 text-center">
        <div class="row row-deck row-cards">
          <h1>Loading</h1>
        </div>
        <div class="row row-deck row-cards">
          <img src={loading} alt="Loading" />
        </div>
      </div>
    </div>
  </div>
);

export default Loading;
