// import { Bcrypt } from 'bcrypt';

export default [
  {
    method: 'GET',
    path: '/',
    // handler: (request: Request, h: ResponseToolkit):string => 'Hello World!',
    handler: (): string => 'Welcome to the restricted home page!',
  },
  {
    method: 'GET',
    path: '/login',
    handler: (): string => ` <html>
                  <head>
                      <title>Login page</title>
                  </head>
                  <body>
                      <h3>Please Log In</h3>
                      <form method="post" action="/login">
                          Username: <input type="text" name="username"><br>
                          Password: <input type="password" name="password"><br/>
                      <input type="submit" value="Login"></form>
                  </body>
              </html>`,
    options: {
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/login',
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    handler: async (request, h) => {
      const { username, password } = request.payload;

      const user = {
        username: 'john',
        password: 'test',
        name: 'John Doe',
        id: '154',
      };


      if (user.username === username && user.password === password) {
        return h.view('/login');
      }

      request.cookieAuth.set({ id: user.id });

      return h.redirect('/');
    },
    options: {
      auth: {
        mode: 'try',
      },
    },
  },
];
