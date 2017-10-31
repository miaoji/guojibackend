# guojibackend

guoji backend

## icon

https://github.com/zuiidea/antd-admin/issues/270

http://www.iconfont.cn/


#copy-to-clipboard使用方法：package.json内
"dependencies": {
    "copy-to-clipboard": "^3.0.5"
}

#使用方法
#引入
import copy from 'copy-to-clipboard';

#使用方法
copyUrl = () => {
    copy(this.props.url);
    message.success('复制成功，如果失败，请在输入框内手动复制.');
};