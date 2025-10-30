// File: frontend/src/api/api.ts

import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// Create axios instance
export const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Auth APIs
export const authAPI = {
  register: (data: { fullName: string; email: string; password: string }) =>
    api.post("/auth/user/register", data),

  login: (data: { email: string; password: string }) =>
    api.post("/auth/user/login", data),

  logout: () => api.get("/auth/user/logout"),

  getMe: () => api.get("/auth/me"),
};

// Phrase APIs
export const phraseAPI = {
  // User endpoints
  getPhrasesByLevel: (level: "beginner" | "intermediate" | "expert") =>
    api.get(`/phrase/level/${level}`),

  getPhraseById: (id: string) => api.get(`/phrase/${id}`),

  markAsPracticed: (id: string, score?: number) =>
    api.post(`/phrase/practice/${id}`, { score }),

  getPracticedPhrases: () => api.get("/phrase/user/practiced"),

  getUserProgress: () => api.get("/phrase/user/progress"),

  // Admin endpoints
  addPhrase: (data: {
    text: string;
    meaning?: string;
    example?: string;
    language?: "English" | "Japanese";
    level: "beginner" | "intermediate" | "expert";
    audioUrl?: string;
    audioMeaningUrl?: string;
  }) => api.post("/phrase/add", data),

  getAllPhrases: () => api.get("/phrase/all"),

  updatePhrase: (
    id: string,
    data: Partial<{
      text: string;
      meaning: string;
      example: string;
      language: "English" | "Japanese";
      level: "beginner" | "intermediate" | "expert";
      audioUrl: string;
      audioMeaningUrl: string;
    }>
  ) => api.put(`/phrase/${id}`, data),

  deletePhrase: (id: string) => api.delete(`/phrase/${id}`),
};

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Export types for TypeScript
export type Language = "English" | "Japanese";
export type Level = "beginner" | "intermediate" | "expert";

export interface Phrase {
  _id: string;
  text: string;
  meaning?: string;
  example?: string;
  language: Language;
  level: Level;
  audioUrl?: string;
  audioMeaningUrl?: string;
  createdBy?: {
    _id: string;
    fullName: string;
    email: string;
  };
  createdAt?: string;
  updatedAt?: string;
}
