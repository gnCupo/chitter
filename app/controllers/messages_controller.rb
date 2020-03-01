class MessagesController < ApplicationController
    before_action :load_entities

    def create
        @message = Message.create user: params.dig(:message, :user),
                                    channel: @channel,
                                    body: params.dig(:message, :body)
    end

    protected

    def load_entities
        @channel = Channel.find(params.dig(:message, :channel_id))
    end
end
