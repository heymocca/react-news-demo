import React, { Component } from 'react';
import { Menu, Icon, Tabs, message, Form, Input, Button, Checkbox, Modal } from 'antd';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class MobileHeader extends Component {
	constructor() {
		super();
		this.state = {
			action: 'login',
			hasLogined: false,
			userName: '',
			userid: 0,
			modalVisible: false
		};
	};

	setModalVisible(value) {
		this.setState({modalVisible: value});
	};

	handleSubmit(e) {
		e.preventDefault();
		var myFetchOptions = {
			method: 'GET'
		};

		var formData = this.props.form.getFieldsValue();
		console.log(formData);
		fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=register&username=userName&password=password&r_userName="+formData.r_userName
		+"&r_password="+formData.r_password
		+"&r_confirmPassword="+formData.r_confirmPassword, myFetchOptions)
		.then(response=>response.json()) // After request, return a promise
		.then(json=>{
			this.setState({userName: json.NickUserName, userid: json.UserId});
			localStorage.userid = json.UserId;
			localStorage.userName = json.NickUserName;
		});
		if(this.state.action=="login"){
			this.setState({hasLogined:true});
		}
		message.success("Request Success!");
		this.setModalVisible(false);
	};
	login() {
		console.log("login");
		this.setState({modalVisible:true});
	};

	callback(key){
		if(key == 1) {
			this.setState({action: 'login'});
		} else if(key == 2) {
			this.setState({action: 'register'});
		}
	}

	render() {
		let {getFieldDecorator} = this.props.form;
		const userStatus = this.state.hasLogined
		?
		<Icon type="inbox"/>
		:
		<Icon type="user" onClick={this.login.bind(this)}/>;
		return (
            <div id="mobileHeader">
                <header>
                    <img src="./src/images/logo.png" alt="logo"/>
                    <span>React News</span>
					{userStatus}
                </header>
				<Modal title="user center" wrapClassName="vertical-center-modal" visible={this.state.modalVisible}
					onCancel={()=>this.setModalVisible(false)}
					onOk={()=>this.setModalVisible(false)} okText="close">
					<Tabs type="card" onChange={this.callback.bind(this)}>
						<TabPane tab="Login" key="1">
							<Form onSubmit={this.handleSubmit.bind(this)}>
								<FormItem label="Username">
									{getFieldDecorator('r_userName')(
										<Input placeholder="Please enter your name"></Input>
									)}
								</FormItem>
								<FormItem label="Password">
									{getFieldDecorator('r_password')(
										<Input placeholder="Please enter your name"></Input>
									)}
								</FormItem>
								<Button type="primary" htmlType="submit">Login</Button>
							</Form>
						</TabPane>
						<TabPane tab="Register" key="2">
							<Form onSubmit={this.handleSubmit.bind(this)}>
								<FormItem label="Username">
									{getFieldDecorator('r_userName')(
										<Input placeholder="Please enter your name"></Input>
									)}
								</FormItem>
								<FormItem label="Password">
									{getFieldDecorator('r_password')(
										<Input placeholder="Please enter your name"></Input>
									)}
								</FormItem>
								<FormItem label="Confirm your password">
									{getFieldDecorator('r_confirmPassword')(
										<Input placeholder="Please confirm your name"></Input>
									)}
								</FormItem>
								<Button type="primary" htmlType="submit">Register</Button>
							</Form>
						</TabPane>
					</Tabs>
				</Modal>

            </div>
        )
	}

}

export default MobileHeader = Form.create()(MobileHeader);
