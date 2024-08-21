import { useState, useEffect } from 'react';

function usePosts() {
    const [posts, setPosts] = useState(() => {
        const savedPosts = localStorage.getItem("posts");
        if (savedPosts) {
            try {
                return JSON.parse(savedPosts);
            } catch (e) {
                return [];
            }
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem('posts', JSON.stringify(posts)); 
    }, [posts]);

    const addPost = (id, title, content) => {
        const newPost = { id, title, content };
        setPosts((prevPosts) => [...prevPosts, newPost]); 
        return Promise.resolve(newPost);
    };

    const deletePost = (id) => {
        setPosts((prevPosts) => prevPosts.filter(post => post.id !== id)); 
    };

    return { posts, addPost, deletePost }; 
}

export default usePosts;