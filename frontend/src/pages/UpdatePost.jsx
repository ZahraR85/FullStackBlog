import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function UpdatePost() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState({ title: '', author: '', content: '', cover: '' });

    // Fetch post details to pre-fill the form
    useEffect(() => {
        fetch(`http://localhost:3000/posts/${id}`)
            .then((response) => response.json())
            .then((data) => setPost(data))
            .catch((error) => console.error('Error fetching post:', error));
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPost((prevPost) => ({ ...prevPost, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3000/posts/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(post),
            });
            if (response.ok) {
                navigate(`/posts/${id}`);
            } else {
                console.error('Error updating post:', response.statusText);
            }
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 shadow-lg rounded-lg w-full max-w-lg"
            >
                <h1 className="text-2xl font-bold mb-6">Edit Post</h1>
                <div className="mb-4">
                    <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={post.title}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="author" className="block text-gray-700 font-bold mb-2">
                        Author
                    </label>
                    <input
                        type="text"
                        id="author"
                        name="author"
                        value={post.author}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="content" className="block text-gray-700 font-bold mb-2">
                        Content
                    </label>
                    <textarea
                        id="content"
                        name="content"
                        value={post.content}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded"
                        rows="5"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="cover" className="block text-gray-700 font-bold mb-2">
                        Cover URL
                    </label>
                    <input
                        type="text"
                        id="cover"
                        name="cover"
                        value={post.cover}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded"
                    />
                </div>
                <div className="flex justify-between">
                    <button
                        type="submit"
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        Update
                    </button>
                    <button
                        type="button"
                        onClick={() => navigate(`/posts/${id}`)}
                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}

export default UpdatePost;
