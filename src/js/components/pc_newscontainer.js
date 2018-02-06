import React, { Component } from 'react';

import {Row, Col} from 'antd';
import { Tabs, Carousel  } from 'antd';
const TabPane = Tabs.TabPane;
import PCNewsBlock from './pc_news_block';
import PCNewsImageBlock from './pc_news_image_block';

export default class PCNewsContainer extends Component {
    render() {

        const settings = {
            dots:true,
            infinite:true,
            speed:500,
            slidesToShow:1,
            autoplay:true
        }


        return(
            <div>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20} className="container">
                        <div className="leftContainer">
                            <div className="carousel">
                                <Carousel {...settings}>
                                    <div><img src="./src/images/carousel_1.jpg"/></div>
                                    <div><img src="./src/images/carousel_2.jpg"/></div>
                                    <div><img src="./src/images/carousel_3.jpg"/></div>
                                    <div><img src="./src/images/carousel_4.jpg"/></div>
                                </Carousel>
                            </div>
                            	<PCNewsImageBlock count={6} type="guoji" width="400px" cardTitle="International News" imageWidth="112px"/>
                        </div>
                        <Tabs className="tabs_news">
                            <TabPane tab="Top News" key="1">
                                <PCNewsBlock count={21} type="top" width="100%" bordered="false" />
                            </TabPane>
                            <TabPane tab="International" key="2">
                                <PCNewsBlock count={21} type="guoji" width="100%" bordered="false" />
                            </TabPane>
                            <TabPane tab="Domestic" key="3">
                                <PCNewsBlock count={21} type="guonei" width="100%" bordered="false" />
                            </TabPane>
                        </Tabs>
                        <div>
                            <PCNewsImageBlock count={4} type="guonei" width="100%" cardTitle="Domestic News" imageWidth="132px"/>
                            <PCNewsImageBlock count={4} type="yule" width="100%" cardTitle="Entertainment" imageWidth="132px"/>
                        </div>
                    </Col>
                    <Col span={2}></Col>

                </Row>

            </div>
        );
    };
}
