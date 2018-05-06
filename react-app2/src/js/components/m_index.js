import React,{Component} from 'react';
import MHeader from './m_header';
import MFooter from './m_footer';
import {Tabs, Carousel} from 'antd';
import MobileList from './m_list';
const TabPane = Tabs.TabPane;
export default class m_index extends Component {
  constructor() {
    super();
  }
  render(){
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      autoplay: true
    };
      return (
          <div>
              <MHeader/>
            <Tabs>
              <TabPane tab="头条" key="1">
                <div className="carousel">
                  <Carousel {...settings}>
                    <div><img src={require('../../images/carousel_1.jpg')}/></div>
                    <div><img src={require('../../images/carousel_2.jpg')}/></div>
                    <div><img src={require('../../images/carousel_3.jpg')}/></div>
                    <div><img src={require('../../images/carousel_4.jpg')}/></div>
                  </Carousel>
                </div>
                <MobileList count={20} type="top"/>
              </TabPane>
              <TabPane tab="社会" key="2">
                <MobileList count={20} type="shehui"/>
              </TabPane>
              <TabPane tab="国内" key="3">
                <MobileList count={20} type="guonei"/>
              </TabPane>
              <TabPane tab="国际" key="4">
                <MobileList count={20} type="guoji"/>
              </TabPane>
              <TabPane tab="娱乐" key="5">
                <MobileList count={20} type="yule"/>
              </TabPane>
            </Tabs>
              <MFooter/>
          </div>
      )
  }
}
