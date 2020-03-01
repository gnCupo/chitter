class Message < ApplicationRecord
  belongs_to :channel, inverse_of: :messages
end
