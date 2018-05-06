import React, {Component} from 'react';
import PCHeader from './pc_header';
import PCFooter from './pc_footer';
import PCNewsContainer from './pc_news_container';

export default class pc_index extends Component {
  constructor() {
    super();

  }

  render() {
    return (
      <div>
        <PCHeader/>
        <PCNewsContainer/>
        <PCFooter/>
      </div>
    )
  }
}
