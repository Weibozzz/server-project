import React, {Component} from 'react';
import styles from '../css/style.css'
import ReactMixin from 'react-mixin';
// let styles = require('../css/style.css');
import MixinLog from './mixin';
import Button from 'antd/lib/button';
import { Rate } from 'antd';


export default class ComponentHeader extends Component {

    render() {
        console.log(styles)
        MixinLog.log();
        const styleComponentHeader = {
            header: {
                backgroundColor: '#333',
                color: 'red'
            }
        };
        return (
            <header className={styles.smallFontSize}>
                <h1 style={styleComponentHeader.header}>这里是头部</h1>
                <Button type="primary">Button</Button>
                <Rate/>
            </header>
        )
    }
}
ReactMixin(ComponentHeader.prototype, MixinLog)