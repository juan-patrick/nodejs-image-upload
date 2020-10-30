const { Schema, model } = require('mongoose');

const PostSchema = new Schema(
  {
    name: String,
    size: Number,
    key: String,
    url: String,
  },
  {
    timestamps: true,
  }
);

module.exports = model('Post', PostSchema);
