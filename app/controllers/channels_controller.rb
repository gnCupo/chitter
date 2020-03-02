# frozen_string_literal: true

class ChannelsController < ApplicationController
  before_action :load_entities

  def index
    @channels = Channel.all
  end

  def create
    @channel = Channel.new permitted_parameters

    if @channel.save
      redirect_to channels_path
    else
      render :new
    end
  end

  def show
    @message = Message.new channel: @channel
    @messages = @channel.messages
  end

  protected

  def load_entities
    @channels = Channel.all
    @channel = Channel.find(params[:id]) if params[:id]
  end

  def permitted_parameters
    params.require(:channel).permit(:name)
  end
end
