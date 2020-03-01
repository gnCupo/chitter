import consumer from "./consumer"

document.addEventListener("turbolinks:load", () => {

    const chatEl = document.querySelector('[data-channel-id]'),
        channelId = chatEl.getAttribute('data-channel-id');
    console.log(channelId);
    createSubscription('ChanelChannel', channelId, chatEl);
})

function createSubscription(channel, channelId, chatEl) {
    consumer.subscriptions.create({ channel: channel, channel_id: channelId }, {
        received(data) {
            this.appendLine(data)
            chatEl.scrollTo({ top: chatEl.scrollHeight, left: 0, behavior: 'smooth' });
        },

        appendLine(data) {
            const html = this.createLine(data)
            chatEl.insertAdjacentHTML("beforeend", html)
        },

        createLine(data) {
            return `<div class="chat-message-container">
              <div class="row no-gutters">
                <div class="col-auto text-center">
                  <span class="username">${data['user']}</span>
                </div>

                <div class="col">
                  <div class="message-content">
                    <p class="mb-1" data-role="message-text">${data['body']}</p>
                    <div class="text-right">
                      <small data-role="message-date">${data['updated_at']}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>`
        }
    });
}