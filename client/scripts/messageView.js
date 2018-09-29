var MessageView = {

  render: _.template(`
      <div class="chat" data-username=<%-username%>>
        <div class="username"><%-username%></div>
        <div><%-text%></div>
      </div>
    `),
  
  renderFriend: _.template(`
      <div class="chat friend" data-username=<%-username%>>
        <div class="username"><%-username%></div>
        <div><%-text%></div>
      </div>
    `)

};