/**
 * We can perform user level authentications here later on using contextual apis (custom)
 * We can route to different components defined in pages directory from here
 */
import React from "react";
import logo from "../public/assets/logo.jpg";

export default function Main() {
  console.log(logo);
  return (
    <div className="container main-container">
      <div className="row">
        <div className="col-md-5 main_content">
          <div className="content">
            <img src={logo.src} />
            <p>
              A public interest initiative powered by AI with key objectives of
              <ul>
                <li>Keeping People Healthy</li>
                <li>Optimizing Care</li>
                <li>Focusing on Priority Populations</li>
              </ul>
              This platform is for helping people evaluate their clinical risk
              score related to heart stroke and take preventive measures for
              mitigating the risk of a cardiac arrest or stroke.
            </p>
            <a class="btn btn-primary" href="#" role="button">
              Personal
            </a>
            <br />
            <br />
            <a class="btn btn-primary" href="#" role="button">
              Organisation
            </a>
          </div>
        </div>
        <div className="col-md-7 fit-image main_img">
          <div
            className="offset-md-1 main_img_text"
            style={{ position: "absolute", bottom: "50px" }}
          >
            <p className="site-title">
              Welcome To Clinical Risk Authentication as a Service
            </p>
            <p className="sub-site-title">Analytics Portal</p>
          </div>
        </div>
      </div>
    </div>
  );
}
