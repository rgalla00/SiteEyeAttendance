import React from "react";
import { MainRoute } from "./Config/Router";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      name: ""
    };
  }
  render() {
    return <div>
    <MainRoute />;
    </div>
  }
}
export default App;
