const { Schema, model } = require('mongoose');

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      trim: true,
      unique: true
    },    
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: () => Promise.resolve(false),
            message: 'Email validation failed'
          }
      },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought'
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    // prevents virtuals from creating duplicate of _id as `id`
    id: false
  }
);

// get total count of comments and replies on retrieval
UserSchema.virtual('friendCount').get(function() {
  return this.friends.reduce(
    (total, friend) => total + friend.length + 1,
    0
  );
});

const User = model('User', UserSchema);

module.exports = User;

