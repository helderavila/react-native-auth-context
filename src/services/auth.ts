interface Response {
  token: string;
  user: {
    name: string;
    email: string;
  };
}

export function signIn(): Promise<Response> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        token: '123fewedf2342wdsfdsf234242',
        user: {
          name: 'Helder',
          email: 'helder@gmail.com',
        },
      });
    }, 2000);
  });
}
