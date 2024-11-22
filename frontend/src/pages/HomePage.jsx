import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:3000/posts');
                const data = await response.json();
                if (Array.isArray(data)) {
                    setPosts(data);
                } else {
                    setError('Unexpected response format.');
                }
            } catch (err) {
                console.error('Error fetching posts:', err.message);
                setError(err.message);
            }
        };

        fetchPosts();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="flex justify-center items-start pt-20 min-h-screen bg-gray-100">
            <div className="container max-w-5xl w-4/5 p-8 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold text-center mb-6">Blog Posts</h1>
                <div className="flex justify-start mb-6">
                    <Link
                        to="/create"
                        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
                    >
                        Create New Post
                    </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {posts.map((post) => (
                        <div
                            key={post.id}
                            className="p-4 border rounded shadow-sm bg-gray-200"
                        >
                            {post.cover && (
                                <img
                                    src={post.cover}
                                    alt={post.title}
                                    className="w-full h-48 object-cover rounded mb-4"
                                />
                            )}
                            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                            <p className="text-gray-600 mb-4">
                                {post.content.slice(0, 100)}...
                            </p>
                            <Link
                                to={`/posts/${post.id}`}
                                className="text-blue-500 hover:underline"
                            >
                                Read More
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default HomePage;
