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

  export class APIError extends Error {
  constructor(message, status, details) {
    super(message)
    this.status = status
    this.details = details
  }
}

export const apiRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token()}`,
      ...options.headers
    }
  })

  const data = await response.json()

  if (!response.ok) {
    throw new APIError(
      data.detail || 'Request failed',
      response.status,
      data
    )
  }

  return data
}