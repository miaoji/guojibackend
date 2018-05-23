# guojibackend

guoji backend

## icon

https://github.com/zuiidea/antd-admin/issues/270

http://www.iconfont.cn/


# copy-to-clipboard使用方法：package.json内
"dependencies": {
    "copy-to-clipboard": "^3.0.5"
}

# 使用方法
# 引入
import copy from 'copy-to-clipboard';

# 使用方法
copyUrl = () => {
    copy(this.props.url);
    message.success('复制成功，如果失败，请在输入框内手动复制.');
};

# models中的路由跳转

import { routerRedux } from 'dva/router'
// '/cargo' -- 你要跳转的路由
yield put(routerRedux.push('/cargo'))

# 项目部署到nginx 在nginx.conf中添加

```
location /api {
			 proxy_pass http://localhost:8000/api;
		}

		location / {
				index  index.html;
				try_files $uri $uri/ /index.html;
		}
```
## 示例
```
server
	{
		listen       666;
		server_name 47.92.30.98;
		root  /home/www/antd-admin/dist;

		location /api {
			 proxy_pass http://localhost:8000/api;
		}

		location / {
				index  index.html;
				try_files $uri $uri/ /index.html;
		}
	}
```