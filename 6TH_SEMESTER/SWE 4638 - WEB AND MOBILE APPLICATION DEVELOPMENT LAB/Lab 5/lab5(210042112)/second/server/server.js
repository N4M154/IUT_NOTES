//210042112
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());


mongoose.connect(
  "",//give your mongodb url here
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
).then(() => {
  console.log("Connected to MongoDB successfully");
}).catch((error) => {
  console.error(error);
});



const postSchema = new mongoose.Schema({
  userName: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
  likes: { type: [String], default: [] }, // people who liked
  dislikes: { type: [String], default: [] }, // people who disliked
});

const Post = mongoose.model("Post", postSchema);


const commentSchema = new mongoose.Schema({
  post: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  userName: { type: String, required: true },
  content: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);


// Routes

app.post("/api/posts", async (req, res) => {
  try {
    const { userName, content } = req.body;
    
    if (!userName || !content) {
      return res.status(400).json({ message: "userName and content are required" });
    }

    const post = new Post({ userName, content });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/posts", async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/posts/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.get("/api/posts/:id/comments", async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comments = await Comment.find({ post: postId }).sort({ date: 1 });
    res.status(200).json(comments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/posts/:id/comments", async (req, res) => {
  try {
    const postId = req.params.id;
    const { userName, content } = req.body;

    if (!userName || !content) {
      return res.status(400).json({ message: "userName and content are required" });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = new Comment({ post: postId, userName, content });
    await comment.save();
    res.status(201).json(comment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/posts/:id/like", async (req, res) => {
  try {
    const { userName } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    //remove from dislikes if it already exists
    const likeIndex = post.likes.indexOf(userName);
    if (likeIndex === -1) {
      post.likes.push(userName);
      const dislikeIndex = post.dislikes.indexOf(userName);
      if (dislikeIndex !== -1) {
        post.dislikes.splice(dislikeIndex, 1);
      }
    } else {
      post.likes.splice(likeIndex, 1);
    }

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

app.post("/api/posts/:id/dislike", async (req, res) => {
  try {
    const { userName } = req.body;
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    //remove from likes if it already exists
    const dislikeIndex = post.dislikes.indexOf(userName);
    if (dislikeIndex === -1) {
      post.dislikes.push(userName);
      const likeIndex = post.likes.indexOf(userName);
      if (likeIndex !== -1) {
        post.likes.splice(likeIndex, 1);
      }
    } else {
      post.dislikes.splice(dislikeIndex, 1);
    }

    await post.save();
    res.status(200).json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


 

const PORT = 5000;
app.listen(PORT, "192.168.0.103",() => { //change this to your ip address
  console.log(`Server running on port ${PORT}`);
  console.log(`Local: http://localhost:${PORT}`);
  console.log(`Network: http://192.168.0.103:${PORT}`);
});

// -_- N4M154 -_-