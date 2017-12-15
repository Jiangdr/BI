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
      if (Object.prototype.toString.call(obj) === '[object Array]' && own.splice) {
        /*if Array, use splice for Vue*/
        obj.forEach((itm, idx) => {
          if (typeof itm === "object" && itm !== null) {
            own.splice(idx, 1, $extend(true, itm.constructor === Array ? [] : {}, itm));
          } else {
            own.splice(idx, 1, itm);
          }
        })
      } else {
        for (let key in obj) {
          if (!obj.hasOwnProperty(key)) continue;//ignore prototype
          let own_val = own[key], copy_val = obj[key];
          if (typeof copy_val === "object" && copy_val !== null) {//Copy the arrays, objects
            let constCopy = copy_val.constructor,
              constOwn = (own_val !== undefined && own_val !== null) && own_val.constructor;
            if (constOwn === constCopy || constOwn === Object) {
              $extend(true, own_val, copy_val);
            } else {
              $extend(true, own[key] = constCopy === Array ? [] : {}, copy_val);
            }
          } else {
            own[key] = copy_val;
          }
        }
      }
    })
    return own;
  }
}

export default {
    wSocket, sockJs, $extend
};

