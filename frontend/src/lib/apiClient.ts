const BASE_URL = (import.meta.env.VITE_API_URL as string | undefined) ?? 'http://localhost:3000'

type ApiResponse<T> = { success: true; data: T; message?: string }

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { 'Content-Type': 'application/json', ...init?.headers },
    ...init,
  })

  const json = (await res.json()) as ApiResponse<T> | { success: false; error: string }

  if (!res.ok || !json.success) {
    const msg = json.success === false ? json.error : `Request failed: ${res.status}`
    throw new Error(msg)
  }

  return json.data
}

export const apiClient = {
  get<T>(path: string) {
    return request<T>(path)
  },
  post<T>(path: string, body: unknown) {
    return request<T>(path, { method: 'POST', body: JSON.stringify(body) })
  },
  patch<T>(path: string, body: unknown) {
    return request<T>(path, { method: 'PATCH', body: JSON.stringify(body) })
  },
  put<T>(path: string, body: unknown) {
    return request<T>(path, { method: 'PUT', body: JSON.stringify(body) })
  },
  del<T>(path: string) {
    return request<T>(path, { method: 'DELETE' })
  },
}
