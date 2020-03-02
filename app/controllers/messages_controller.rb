# frozen_string_literal: true

class MessagesController < ApplicationController
  skip_before_action :verify_authenticity_token
  before_action :load_entities

  def create
    @message = Message.create user: params.dig(:message, :user),
                              channel: @channel,
                              body: params.dig(:message, :body)

    ChannelChannel.broadcast_to(@channel, @message)
  end

  protected

  def load_entities
    @channel = Channel.find(params.dig(:message, :channel_id))
  end
end
