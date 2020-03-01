class ChannelsController < ApplicationController
    before_action :load_entities
    
    def index
        @channels = Channel.all
    end

    def new
        @channel = Channel.new
    end

    def create
        @channel = Channel.new permitted_parameters

        if @channel.save
            flash[:success] = 'Channel #{@channel.name} was successfully created.'
            redirect_to channels_path
        else
            render :new
        end
    end

    def edit
    end

    def update
        if @channel.update_attributes(permitted_parameters)
            flash[:success] = 'Channel #{@channel.name} was successfully updated.'
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
