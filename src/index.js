import jQuery from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
console.log(jQuery);

window.jQuery = jQuery;
/**
 * Import the stylesheet you want used! Here we just reference
 * the main SCSS file we have in the styles directory.
 */
import 'bootstrap/less/bootstrap.less';
import './assets/css/base.scss';

/**
 * Both configureStore and Root are required conditionally.
 * See configureStore.js and Root.js for more details.
 */
import { configureStore } from './store/configureStore';
import { Root } from './containers/Root';

const store = configureStore();

ReactDOM.render(
  <Root store={store} />,
  document.getElementById('root')
);
