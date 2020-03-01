class Channel < ApplicationRecord
    has_many :messages, dependent: :destroy,
                        inverse_of: :channel
end
