const Post = require('../models/Post');

module.exports = {
  async index(req, res) {
    const posts = await Post.find();

    return res.status(200).json(posts);
  },
  async store(req, res) {
    const { originalname: name, size, key, location: url = '' } = req.file;

    const post = await Post.create({
      name,
      size,
      key,
      url,
    });

    return res.status(201).json(post);
  },
  async delete(req, res) {
    const post = await Post.findById(req.params.id);

    await post.remove();

    return res.status(200).json(post);
  },
};
