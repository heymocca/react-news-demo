import React, { Component } from 'react';
import MobileHeader from './mobile_header';
import MobileFooter from './mobile_footer';
import { Tabs } from 'antd';
const TabPane = Tabs.TabPane;

export default class MobileIndex extends Component {

	render() {
		return (
			<div>
				<MobileHeader/>
				<Tabs>
					<TabPane tab="top" key="1">Top</TabPane>
					<TabPane tab="society" key="2">Society</TabPane>
					<TabPane tab="domestic" key="3">Domestic</TabPane>
					<TabPane tab="international" key="4">International</TabPane>
					<TabPane tab="entertainment" key="5">Entertainment</TabPane>
				</Tabs>
				<MobileFooter/>
			</div>

        )
	}

}
