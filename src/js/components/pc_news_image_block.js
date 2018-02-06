import React, {Component} from 'react';
import {Card} from 'antd';
import {Router, Route, Link, BrowserRouter} from 'react-router-dom';

export default class PCNewsImageBlock extends Component {
    constructor() {
        super();
        this.state = {
            news: ''
        };
    }
    componentWillMount() {
        var myFetchOptions = {
            method: 'GET'
        };
        fetch("http://newsapi.gugujiankong.com/Handler.ashx?action=getnews&type=" + this.props.type + "&count=" + this.props.count, myFetchOptions).then(response => response.json()).then(json => this.setState({news: json}));
    };

    render() {
        const styleImage = {
            display: "block",
            width: this.props.imageWidth,
            height: "90px"
        };

        // 标题长度超过宽度则隐藏
        const styleH4 = {
            width: this.props.imageWidth,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            fontSize: "12px"
        }

        const {news} = this.state;
        const newsList = news.length
        ?
        news.map((newsItem, index) => (
            <div key={index} className="imageblock">
                <BrowserRouter>
                    <Link to={`details/${newsItem.uniquekey}`} target="_blank">
                        <div className="custom-image">
                            <img src={newsItem.thumbnail_pic_s} alt="" style={styleImage}/>
                        </div>
                        <div className="custom-card">
                            <h4 style={styleH4}>{newsItem.title}</h4>
                            <p className="newsSource">{newsItem.author_name}</p>
                        </div>
                    </Link>
                </BrowserRouter>

            </div>
        ))
        :
        'No Image';

        return(
            <div className="topNewsList">
                <Card title={this.props.cardTitle} bordered={true} style={{
                    width: this.props.width
                }}>
                {newsList}
                </Card>
            </div>
        )


    }







}
