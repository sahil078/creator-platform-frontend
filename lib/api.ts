const API_BASE_URL = 'https://creator-platform-backend.vercel.app/api';

// Type definitions
type UserData = {
  name: string;
  email: string;
  password: string;
};

type Credentials = {
  email: string;
  password: string;
};

type IdeaData = {
  topic: string;
  niche: string;
};

export type AnalyticsData = {
  followers: number[];
  engagement: Array<{
    post: number;
    likes: number;
    comments: number;
  }>;
  bestPostTime: string;
};

type AuthResponse = {
  status: string;
  token?: string;
  data?: {
    user: {
      _id: string;
      name: string;
      email: string;
    };
  };
  message?: string;
};

type IdeaResponse = {
  reelIdea: string;
  caption: string;
  hashtags: string[];
  hook: string;
  error?: string;
};

// API functions
export const registerUser = async (userData: UserData): Promise<AuthResponse> => {
  const response = await fetch(`${API_BASE_URL}/v1/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    throw new Error(`Registration failed with status: ${response.status}`);
  }
  
  return await response.json();
};

// lib/api.ts
export const loginUser = async (credentials: Credentials): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/v1/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
      credentials: 'include',
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Login failed with status: ${response.status}`);
    }
    
    const data = await response.json();
    
    // Store token in localStorage (optional - might be better to do this in the auth context)
    if (data.token) {
      localStorage.setItem('token', data.token);
      if (data.data?.user) {
        localStorage.setItem('user', JSON.stringify(data.data.user));
      }
    }
    
    return data;
  } catch (error) {
    console.error('Login error:', error);
    throw error; // Re-throw to handle in the calling component
  }
};

export const generateIdea = async (ideaData: IdeaData, token: string): Promise<IdeaResponse> => {
  const response = await fetch(`${API_BASE_URL}/v1/ideas`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(ideaData),
  });
  
  if (!response.ok) {
    throw new Error(`Idea generation failed with status: ${response.status}`);
  }
  
  return await response.json();
};

export const getAnalytics = async (token: string): Promise<AnalyticsData> => {
  const response = await fetch(`${API_BASE_URL}/v1/analytics`, {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    credentials: 'include',
  });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch analytics with status: ${response.status}`);
  }
  
  return await response.json();
};