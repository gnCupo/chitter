import consumer from "./consumer";

document.addEventListener("turbolinks:load", () => {
  const chatEl = document.querySelector('[data-channel-subscribe="channel"]'),
    channelId = chatEl.dataset.channelId;

  // Scroll all the way down
  chatEl.scrollTop = chatEl.scrollHeight;

  // Create a subscription to the ChannelChannel
  createSubscription("ChannelChannel", channelId, chatEl);
});

function createSubscription(channel, channelId, chatEl) {
  consumer.subscriptions.create(
    // Channel information
    { channel: channel, channel_id: channelId },
    // Handlers
    {
      /**
       * received is the method which is called when
       * websockets sends data to out consumer
       *
       * @param Object data
       */
      received(data) {
        // Parse data & append element to chat container
        this.appendLine(data);

        // Autoscroll
        chatEl.scrollTo({
          top: chatEl.scrollHeight,
          left: 0,
          behavior: "smooth"
        });
      },

      /**
       * appendLine appends the element from createLine
       * to the chat-container
       */
      appendLine(data) {
        const html = this.createLine(data);
        chatEl.insertAdjacentHTML("beforeend", html);
      },

      /**
       * createLine returns an HTML element containing
       * data from the newly created message
       */
      createLine(data) {
        // Create date obj from string
        const creationDate = new Date(data["created_at"]),
          // Make it dutch
          formattedDate = Intl.DateTimeFormat("nl-NL", {
            timeStyle: "medium"
          }).format(creationDate);

        return `<div class="message">
          <div class="username">
            ${data["user"]}
          </div>
          <div class="body">
            <small class="time">
              ${formattedDate}
            </small>
            <p>${data["body"]}</p>
          </div>
        </div>`;
      }
    }
  );
}
