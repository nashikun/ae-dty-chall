const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = Schema({
    senderId: {type: Schema.Types.ObjectId, ref: 'user', required: true},
    recipientId: {type: Schema.Types.ObjectId, ref: 'user', required: true},
    title: {type: String, maxlength: 20, required: true},
    message: {type: String, required: true},
    read: {type: Boolean, default: false}
  },
  {
    timestamps: {createdAt: true, updatedAt: false},
    toObject: {virtuals: true},
    toJSON: {virtuals: true}
  });

messageSchema.virtual('sender', {
  ref: 'profile',
  localField: 'senderId',
  foreignField: 'user',
  justOne: true
});

messageSchema.virtual('recipient', {
  ref: 'profile',
  localField: 'recipientId',
  foreignField: 'user',
  select: 'user username',
  justOne: true
});

module.exports = mongoose.model('message', messageSchema, 'messages');
