class FetchService {
  private responseInterceptors: Array<(response: Response) => void> = []

  async get<T>(url: string): Promise<T> {
    return this._request('GET', url)
  }

  async post<T>(url: string, body: any): Promise<T> {
    return this._request('POST', url, body)
  }

  async put<T>(url: string, body: any): Promise<T> {
    return this._request('PUT', url, body)
  }

  async delete<T>(url: string): Promise<T> {
    return this._request('DELETE', url)
  }

  private async _request<T>(method: string, url: string, body?: any): Promise<T> {
    const options: RequestInit = {
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    }
    if (body) {
      options.body = JSON.stringify(body)
    }
    const response = await fetch(url, options)
    this.runResponseInterceptors(response)
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    const data: T = await response.json()
    return data
  }

  private runResponseInterceptors(response: Response) {
    this.responseInterceptors.forEach((interceptor) => interceptor(response))
  }
}

export default FetchService
