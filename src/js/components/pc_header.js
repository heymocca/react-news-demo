import React, { Component } from 'react';
import { Row, Col } from 'antd';
import {
	Menu,
	Icon,
	Tabs,
	message,
	Form,
	Input,
	Button,
	Checkbox,
    Modal,
} from 'antd';

const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


class PCHeader extends Component {
	constructor() {
		super();
		this.state = {
			current: 'top',
            modalVisible: false,
            action: 'login',
            hasLogined: false,
            userName: '',
            userid: 0
		};
	}

    setModalVisible(value) {
        this.setState({modalVisible: value})
    };

    handleClick(e) {
		console.log(e);
        if(e.key=="register") {
            this.setState({current: 'register'});
            this.setModalVisible(true);
        } else {
            this.setState({current: e.key});
        }
    };
    handleSubmit(e) {
        e.preventDefault();
		var myFetchOptions = {
			method: 'GET'
		};
		var formData = this.props.form.getFieldsValue();
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=register&username=userName&password=password&r_userName="+formData.r_userName
        +"&r_password="+formData.r_password
        +"&r_confirmPassword="+formData.r_confirmPassword,myFetchOptions)
                .then(response => response.json())
        		.then(json => {
        			this.setState({userName: json.NickUserName, userid: json.UserId});
        			localStorage.userid= json.UserId;
        			localStorage.userName = json.NickUserName;
        		});
        		if (this.state.action=="login") {
        			this.setState({hasLogined:true});
        		}
        		message.success("Request Success!");
        		this.setModalVisible(false);
    };
    callback(key) {
        if(key == 1) {
            this.setState({action: 'login'});
        } else if(key == 2) {
            this.setState({action: 'register'});
        }
    }

	login() {
		this.setModalVisible(true);
	}

	logout() {
		localStorage.userid = '';
		localStorage.userName = '';
		this.setState({hasLogined:false});
	}
	render() {
        let {getFieldDecorator} = this.props.form;  // Define a global variable for getting value from the Form
        const userStatus = this.state.hasLogined // Check if user logged in
        ?
        <Menu.Item key="logout" className="register">
            {/* <Button type="primary" htmlType="button"></Button> */}
            &nbsp;&nbsp;
			<Icon type="inbox"/>
            {/* <Link tartget="_blank"> */}
                {/* <Button type="dashed" htmlType="button">{this.state.userName}</Button> */}
            {/* </Link> */}
            &nbsp;&nbsp;
            <Button htmlType="button">Logout</Button>
        </Menu.Item>
        :
        <Menu.Item key="register" className="register">
            <Icon type="user"/>Register/Login
        </Menu.Item>

		return ( <header>
			<div>
				<Row>
					<Col span={2}></Col>
					<Col span={4}>
						<a href="/" className="logo">
							<img src="./src/images/logo.png" alt="logo"/>
							<span>React News</span>
						</a>
					</Col>
					<Col span={16}>
						<Menu mode="horizontal" onClick={this.handleClick.bind(this)} selectedKeys={[ this.state.current ]}>
							<Menu.Item key="top"><Icon type="appstore"/>Top</Menu.Item>
							<Menu.Item key="society"><Icon type="appstore"/>Society</Menu.Item>
							<Menu.Item key="domestic"><Icon type="appstore"/>Domestic</Menu.Item>
							<Menu.Item key="entertainment"><Icon type="appstore"/>Entertainment</Menu.Item>
							<Menu.Item key="sports"><Icon type="appstore"/>Sports</Menu.Item>
							<Menu.Item key="militery"><Icon type="appstore"/>Militery</Menu.Item>
							<Menu.Item key="fashion"><Icon type="appstore"/>Fashion</Menu.Item>
                            {userStatus}
						</Menu>
                {/*=======================pop up===================*/}
                <Modal title="user center" wrapClassName="vertical-center-modal" visible={this.state.modalVisible}
                    onCancel = {()=>this.setModalVisible(false)}
                    onOk = {()=>this.setModalVisible(false)} okText="close">
                    <Tabs type="card" onChange={this.callback.bind(this)}>
                        <TabPane tab="login" key="1">
                            <Form onSubmit={this.handleSubmit.bind(this)}>
                                <FormItem label="Username">
                                    {getFieldDecorator('l_userName')(
                                        <Input placeholder="Please enter username"/>
                                    )}
                                </FormItem>
                                <FormItem label="Password">
                                    {getFieldDecorator('l_password')(
                                        <Input placeholder="Please enter password"/>
                                    )}
                                    <Button type="primary" htmlType="submit">Login</Button>
                                </FormItem>
                            </Form>
                        </TabPane>
                    <TabPane tab="register" key="2">
                        <Form  onSubmit={this.handleSubmit.bind(this)}>
                            <FormItem label="Username">
                                {getFieldDecorator('r_userName')(
                                    <Input placeholder="Please enter username" />
                                )}
                            </FormItem>
                            <FormItem type="password" label="Password">
                                {getFieldDecorator('r_password')(
                                    <Input placeholder="Please enter password" />
                                )}
                            </FormItem>
                            <FormItem type="password" label="Comfirm Password">
                                {getFieldDecorator('r_confirmPassword')(
                                    <Input placeholder="Please confirm username" />
                                )}
                            </FormItem>
                            <Button type="primary" htmlType="submit">Register</Button>
                        </Form>
                    </TabPane>
                    </Tabs>



                    </Modal>


					</Col>
					<Col span={2}></Col>
				</Row>
			</div>

		</header> )
	}
}

export default PCHeader = Form.create({})(PCHeader); // encapsulate form
