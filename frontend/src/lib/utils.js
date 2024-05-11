import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { API_URL } from "./config"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

/**
 * @param {string | URL | Request} url 
 * @param {RequestInit} options 
 */
export function fetchWithToken(url, options = {}) {
  return fetch(API_URL + url, {
    ...options,
    headers: {
      ...options?.headers,
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  })
}
