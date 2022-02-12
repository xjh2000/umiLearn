import {GithubOutlined} from '@ant-design/icons';
import {DefaultFooter} from '@ant-design/pro-layout';

export default () => {
    const defaultMessage = 'xjh support';
    const currentYear = new Date().getFullYear();
    return (
        <DefaultFooter
            copyright={`${currentYear} ${defaultMessage}`}
            links={[
                {
                    key: 'github',
                    title: <GithubOutlined/>,
                    href: 'https://github.com/xjh2000',
                    blankTarget: true,
                },
            ]}
        />
    );
};
