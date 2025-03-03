interface LoginResponse {
    token: string;
    name: string;
  }
  
  export const loginService = async (name: string, password: string): Promise<LoginResponse> => {
    const response = await fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, password }),
    });
  
    if (!response.ok) {
      throw new Error('Erro ao fazer login');
    }
  
    const data: LoginResponse = await response.json();
  
    sessionStorage.setItem('auth-token', data.token);
    sessionStorage.setItem('username', data.name);
  
    return data;
  };