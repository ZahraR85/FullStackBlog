import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function PostDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:3000/posts/${id}`)
            .then((response) => response.json())
            .then((data) => setPost(data))
            .catch((error) => console.error('Error fetching post:', error));
    }, [id]);

    const handleDelete = async () => {
        try {
            const confirmed = window.confirm('Are you sure you want to delete?');
            if (confirmed) {
                const response = await fetch(`http://localhost:3000/posts/${id}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    navigate('/');
                } else {
                    console.error('Error deleting post:', response.statusText);
                }
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };
    return (
        post && (
            <div className="flex justify-center items-start pt-20 min-h-screen bg-gray-100">
                <div className="container max-w-3xl w-4/5 p-8 bg-white shadow-lg rounded-lg">
                    {post.cover && (
                        <img
                            src={post.cover}
                            alt={post.title}
                            className="w-full h-64 object-cover rounded mb-6"
                        />
                    )}
                    <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
                    <p className="mb-8 text-gray-700">{post.content}</p>
                    <div className="flex space-x-4">
                        <button
                            onClick={handleDelete}
                            className="bg-red-500 text-white py-2 px-6 rounded hover:bg-red-700 transition"
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => navigate(`/edit/${id}`)}
                            className="bg-green-500 text-white py-2 px-6 rounded hover:bg-green-700 transition"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-gray-500 text-white py-2 px-6 rounded hover:bg-gray-600 transition"
                        >
                            Back
                        </button>
                    </div>
                </div>
            </div>
        )
    );
}

export default PostDetails;
