import React, { Component } from 'react';
import {Nav, NavItem} from 'react-bootstrap';

export default class SideMenu extends Component {
  render() {
    return (
        <div className="component-side-menu col-12 col-md-3 col-xl-2">
            <Nav stacked>
                <NavItem>项目</NavItem>
            </Nav>
        </div>
    );
  }
}
