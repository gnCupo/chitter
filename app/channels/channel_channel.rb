# frozen_string_literal: true

class ChannelChannel < ApplicationCable::Channel
  def subscribed
    channel = Channel.find params[:channel_id]
    stream_for channel
  end
end
