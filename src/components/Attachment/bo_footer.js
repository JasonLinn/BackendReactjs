import React, {Component} from 'react';
import { Link } from 'react-router';
import * as COMMON from '../../common/common';
import Decrypt from '../../services/decrypt';

export default class BOFooter extends Component {
    componentDidMount() {

    }

    render() {

        return (
          <footer className="footer">
            <div className="footer-block author">
              <ul>
                <li> created by XXX </li>
              </ul>
            </div>
          </footer>
        );
    }
}
