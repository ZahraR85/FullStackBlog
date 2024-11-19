import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [form, setForm] = useState({ author: '', title: '', content: '', cover: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const response = await fetch('http://localhost:3000/posts', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(form),
          });
          if (response.ok) {
              navigate('/');
          } else {
              console.error('Error creating post:', response.statusText);
          }
      } catch (error) {
          console.error('Error creating post:', error);
      }
  };

  return (
      <div className="flex justify-center items-start pt-20 min-h-screen bg-gray-100">
          <div className="container max-w-3xl w-4/5 p-8 bg-white shadow-lg rounded-lg">
              <h1 className="text-2xl font-bold mb-6 text-center">Create Post</h1>
              <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                      name="author"
                      placeholder="Author"
                      onChange={handleChange}
                      className="block w-full p-2 border border-gray-300 rounded"
                  />
                  <input
                      name="title"
                      placeholder="Title"
                      onChange={handleChange}
                      className="block w-full p-2 border border-gray-300 rounded"
                  />
                  <textarea
                      name="content"
                      placeholder="Content"
                      onChange={handleChange}
                      rows="5"
                      className="block w-full p-2 border border-gray-300 rounded"
                  />
                  <input
                      name="cover"
                      placeholder="Cover URL"
                      onChange={handleChange}
                      className="block w-full p-2 border border-gray-300 rounded"
                  />
                  <button
                      type="submit"
                      className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition"
                  >
                      Create Post
                  </button>
              </form>
          </div>
      </div>
  );
}

export default CreatePost;
