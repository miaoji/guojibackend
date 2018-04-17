import { routerRedux } from 'dva/router';

function orderWebsocket () {
  const state = `admin1`
  const webSocketUrl = `ws://api.mingz-tech.com/webSocket/${state}`
  // const webSocketUrl = `ws://192.168.231.239:8077/webSocket/${state}`
  const websocket = new WebSocket(webSocketUrl)
  websocket.onmessage = async function (event) {
    try {
      let eventData = event.data
      // console.log('webSocket event data', event)
      console.log('webSocket event data sting', eventData)
      eventData = JSON.parse(eventData);
      console.log('webSocket event data', eventData)
      const token = window.localStorage.getItem('guojipc_token')
      if (token) {
        handleNotification(eventData)
      }
    } catch (err) {
      console.error(err)
    }
  }

  //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。  
  window.onbeforeunload = function () {  
    closeWebSocket();  
  }

  //关闭WebSocket连接  
  function closeWebSocket() {  
    websocket.close();  
  }

  function handleNotification (text) {
    if (window.Notification) {
      const popNotice = function() {
        if (Notification.permission == "granted") {
          console.log('text', text)
          let { title, body } = text
          const notification = new Notification(title, {
              body,
              icon: 'http://image.zhangxinxu.com/image/study/s/s128/mm1.jpg'
          });
          
          notification.onclick = function() {
            // window.location.href = '/order'
            window.open('/order')
            notification.close();
          };
        }
      };
      
      if (Notification.permission == "granted") {
        popNotice();
      } else if (Notification.permission != "denied") {
        Notification.requestPermission(function (permission) {
          popNotice();
        });
      }
    } else {
      alert('浏览器不支持Notification');    
    }
  }
}

export default orderWebsocket