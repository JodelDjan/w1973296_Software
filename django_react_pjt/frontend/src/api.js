const BASE_URL = 'http://localhost:8000/api'
const token = () => localStorage.getItem('token')

export const getPosts = () =>
  fetch(`${BASE_URL}/posts/`, {
    headers: { Authorization: `Bearer ${token()}` }
  }).then(res => res.json())

export const createPost = (content) =>
  fetch(`${BASE_URL}/posts/create/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token()}`
    },
    body: JSON.stringify({ content })
  }).then(res => res.json())

export const searchPosts = (query) =>
  fetch(`${BASE_URL}/posts/search/?q=${query}`, {
    headers: { Authorization: `Bearer ${token()}` }
  }).then(res => res.json())

export const applyToPost = (postId) =>
  fetch(`${BASE_URL}/posts/${postId}/apply/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token()}`
    }
  }).then(res => res.json())