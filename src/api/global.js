/***
 * websocket实时更新
 * @param ws    ws
 * @param send  type: string
 * @param onmessage type: function
 * @param onclose   type: function
 * @param overtime   type: function  连接超时后的回调
 * @param duration   websocket连接时长  type: number(秒)    default: infinite
 */
function wSocket({
                     ws = null,
                     send = null,
                     onmessage = (e) => {},
                     onclose = (e) => {},
                     overtime = (msg = "The socket closed") => {console.log(msg)},
                     duration = "infinite",
                     onopen = (e) => {},
                 }) {
    // if (!!ws) return;

    // 创建一个Socket实例
    let socket = new WebSocket(`ws://${ws}`);
    // 打开Socket
    socket.onopen = onopen;

    if (send === null){
        // 发送一个初始化消息
        // socket.send(send);
    }
    // 监听消息
    socket.onmessage = onmessage;

    // 监听Socket的关闭
    socket.onclose = onclose;
    //关闭Socket
    window.onbeforeunload = function(event) {
        // 关闭Socket....
        socket.close();
    };
    if (duration !== "infinite"){
        if (typeof duration === "number"){
            setTimeout(function () {
                // 关闭Socket....
                socket.close();
                overtime();
            }, duration * 1000);
        }else {
            console.error(`TypeError: ${duration} is not a number`);
        }
    }
}

/***
 * 基础sockjs的 websocket实时更新
 * @param callback onmessage回调函数
 * @param Vue  vue实例
 * @param theme 主题
 */
function sockJs({callback, Vue, theme, ws}) {
  let socket = new SockJS('http://' + ws);
  let stompClient = Stomp.over(socket);
  stompClient.connect({}, function (frame) {
    stompClient.subscribe(theme, function (response) {
      callback(response.body, Vue);
      socket.onclose = function()  {
        console.log('websocket closed')
      };
      // socket.close();
    })
  });
}

/**
 *深拷贝
 * @peram deep Boolean true => 深拷贝
 * @return 目标对象
 */
function $extend(deep, ...rest) {
  if (deep !== true && typeof deep === "object") {//simple copy
    return Object.assign(deep, ...rest);
  } else if (deep === true && rest.every(v => typeof v === "object")) {//deep copy
    let [own, ...copy] = rest;
    copy.forEach(obj => {
      for (let key in obj) {
        if (!obj.hasOwnProperty(key)) continue;//ignore prototype
        let val = obj[key], target = own[key];
        if (typeof val === "object" && val !== null) {//Copy the arrays, objects
          let constV = val.constructor,
            constT = (target !== undefined && target !== null) && target.constructor;
          if (constT === constV) {
            $extend(true, target, val);
          } else {
            $extend(true, own[key] = constV === Array ? [] : {}, val);
          }
        } else {
          own[key] = val;
        }
      }
    })
    return own;
  }
}

export default {
    wSocket, sockJs, $extend
};

