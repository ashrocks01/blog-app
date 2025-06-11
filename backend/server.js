const express = require('express')
const cors = require('cors');
const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let posts = [];
let currentId = 1;

// GET /posts
app.get('/posts', (req, res) => {
    res.json(posts);
  });

  // GET /posts/:id
app.get('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  });

  app.post('/posts', (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ error: 'Title and content are required' });
  
    const newPost = { id: currentId++, title, content };
    posts.push(newPost);
    res.status(201).json(newPost);
  });


  // PUT /posts/:id
app.put('/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).json({ error: 'Post not found' });
  
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ error: 'Title and content are required' });
  
    post.title = title;
    post.content = content;
    res.json(post);
  });


  // DELETE /posts/:id
app.delete('/posts/:id', (req, res) => {
    const index = posts.findIndex(p => p.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Post not found' });
  
    posts.splice(index, 1);
    res.status(204).end();
  });
  
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));