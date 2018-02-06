import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {HashRouter,Route,Link} from 'react-router-dom';
import PCIndex from './components/pc_index';
import MobileIndex from './components/mobile_index';


import 'antd/dist/antd.css';
import MediaQuery from 'react-responsive';




export default class Root extends Component{
  render(){
    return (
        <div>
            <MediaQuery query='(min-device-width: 1224px)'>
                <PCIndex/>
            </MediaQuery>
            <MediaQuery query='(max-device-width: 1224px)'>
                <MobileIndex/>
            </MediaQuery>
        </div>
    );
  };
}

ReactDOM.render(<Root/>, document.querySelector('#mainContainer'));
