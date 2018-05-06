import React, {Component} from 'react';
import {Row, Col} from 'antd';
import {Menu, Icon} from 'antd';


export default class m_footer extends Component {
    constructor() {
        super();
    }
    render() {
        return (
            <footer>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20} className="footer">
                        &copy;&nbsp;2016 ReactNews. All Rights REserved.
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </footer>
        )
    }
}