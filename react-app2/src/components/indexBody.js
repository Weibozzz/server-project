import React, {Component} from 'react';

export default class BodyIndex extends Component {
    componentWillMount(){
        console.log('这是bodyindex页面组件将要创建-componentWillMount')
    }
    componentDidMount(){
        console.log('这是bodyindex页面组件创建完成-componentDidMount')
    }
    render() {
        let username = '';
        let boolInput = true;

        let html = "IMMOC&nbsp;LESSON";
        /*注释*/
        // 注释
        return (
            <div>
                <h2>页面主题内容</h2>
                <p>{username === '' ? '用户还没登陆' : `用户名：${username}`}</p>
                <p>
                    <input type="button" value="默认按钮" disabled={boolInput}/>
                    {/*注释*/}
                </p>
                <p>{html}</p> {/*需要进行转码*/}
                <p dangerouslySetInnerHTML={{__html: html}}></p>
            </div>
        )
    }
}