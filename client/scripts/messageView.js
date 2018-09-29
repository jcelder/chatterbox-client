var MessageView = {

  render: _.template(`
      <div class="chat" data-userid=<%-userId%>>
        <div class="username"><%-username%></div>
        <div><%-text%></div>
      </div>
    `),
  
  renderFriend: _.template(`
      <div class="chat friend" data-userid=<%-userId%>>
        <div class="username"><%-username%></div>
        <div><%-text%></div>
      </div>
    `)

};