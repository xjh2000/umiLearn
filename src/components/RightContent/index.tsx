// noinspection ES6ShorthandObjectProperty

import {Space} from 'antd';
import {QuestionCircleOutlined} from '@ant-design/icons';
import React from 'react';
import {useModel} from 'umi';
import styles from './index.less';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {

    const { initialState }: any = useModel('@@initialState');

    if (!initialState || !initialState.settings) {
        return null;
    }

    const {navTheme, layout} = initialState.settings;
    let className = styles.right;

    if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
        className = `${styles.right}  ${styles.dark}`;
    }

    return (
        <Space className={className}>
        <span
            className={styles.action}
            onClick={() => {
                window.open('https://pro.ant.design/docs/getting-started');
            }}
        >
        <QuestionCircleOutlined/>
        </span>
        </Space>
    );
};

export default GlobalHeaderRight;