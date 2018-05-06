import React, {Component} from 'react';
import './App.css';
import './css/pc.css';
import './css/mobile.css';
import PCIndex from './js/components/pc_index';
import MIndex from './js/components/m_index';
import PCNewsDetails from './js/components/pc_news_detail'
import MobileNewsDetails from './js/components/m_news_detail'
import MediaQuery from 'react-responsive';
import PCUserCenter from './js/components/pc_usercenter';
import MobileUserCenter from './js/components/m_usercenter';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";

class App extends Component {
    render() {
        return (
            <div className="App">
                <MediaQuery query="(min-device-width: 1224px)">
                  <Router >
                    <div>
                      <Route exact  path="/" component={PCIndex}></Route>
                      <Route path="/details/:uniquekey" component={PCNewsDetails}></Route>
                        <Route path="/usercenter" component={PCUserCenter}></Route>
                    </div>
                  </Router>
                </MediaQuery>
                <MediaQuery query="(max-device-width: 1224px)">
                  <Router >
                    <div>
                      <Route exact path="/" component={MIndex}></Route>
                      <Route path="/details/:uniquekey" component={MobileNewsDetails}></Route>
                      <Route path="/usercenter" component={MobileUserCenter}></Route>
                    </div>
                  </Router>
                </MediaQuery>
            </div>
        );
    }
}

export default App;
