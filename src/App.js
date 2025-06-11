import React,{useState, useEffect} from "react";
import './App.css';

const API_URL = 'http://localhost:5000/posts';

function App() {
  const[posts,setPosts] = useState([]);
  const[form,setForm] = useState({title:'',content:'',id:null});

  useEffect(() =>{
    fetch(API_URL).then(res=>res.json()).then(setPosts);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = form.id ? 'PUT' : 'POST';
    const url = form.id ? `${API_URL}/${form.id}` : API_URL;

    const response = await fetch(url, {
      method,
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({title:form.title, content: form.content}),
    });

    if (response.ok) {
      const updated = await response.json();
      setPosts(prev =>
        form.id ? prev.map(p=> (p.id === updated.id ? updated : p)) : [...prev,updated]
      );
      setForm({title:'',content:'', id:null});
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this post?')) {
      await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
      setPosts(prev => prev.filter(p => p.id !== id));
    }
  };

   const startEdit = (post) => setForm(post);

   return(
    <div className="container">
        <h1>Simple blog</h1>

        <form onSubmit={handleSubmit}>
          <input placeholder="Title"
          value={form.title}
          onChange = {e => setForm({...form, title: e.target.value})}
          required
        />
        <textarea
            placeholder="Content"
            value={form.content}
            onChange = {e => setForm({...form, content: e.target.value})}
            required
        />

        <button type="submit">{form.id ? 'Update' : 'Create'} Post</button>
        {form.id && <button onClick={() => setForm({ title: '', content: '', id: null })}>Cancel</button>}
        
        </form>
        <div className="posts">
        {posts.map(post => (
          <div className="post" key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <button onClick={() => startEdit(post)}>Edit</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
   );
}

export default App;