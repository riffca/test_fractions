<template>
<div class="comments">

  <ul>
    <li v-for="comment, index in comments">
      <div>
        <p>тестовый комментарий {{comment}} <span class="delete_comment" @click="deleteComment(index)">(удалить)</span></p>
      </div>
    </li>
  </ul>


</div>
</template>

<script>
export default {

  name: 'Comments',

  mounted(){

    this.socket = new WebSocket("ws://echo.websocket.org/");

    this.socket.onopen = function() {
      console.log("Соединение установлено.");
    };

    this.socket.onclose = function(event) {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения'); // например, "убит" процесс сервера
      }
      console.log('Код: ' + event.code + ' причина: ' + event.reason);
    };

    let self = this

    this.socket.onmessage = function(event) {
      self.socketActions[event.data](event.data)
      console.log("Получены данные " + event.data);
    };

    this.socket.onerror = function(error) {
      console.log("Ошибка " + error.message);
    };

  },

  methods: {
    _on(data,cb){
      this.socketActions[data] = cb
    },
    _service(data, cb) {
      this._on(data, cb)
      this.socket.send(data)
      console.log(`send ${data}`)
    },
    _req(data) {
      return new Promise((resolve,reject)=>{
        this._service(data,res=>{
          resolve(res)
        })
      })
    },

    deleteComment(index){
      this._req(index).then(index=>{
        console.log(index)
        this.comments.splice(parseFloat(index), 1)
      })
    }
  },

  data () {
    return {
      socket: "",
      comments: [1,2,3,4,5,6,7,8],
      socketActions: {}
    }
  }

}
</script>

<style lang="css" scoped>
.delete_comment {
  cursor: pointer;
}
</style>
