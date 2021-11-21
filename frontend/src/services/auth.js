export function signIn(){
  return new Promise((resolve) => {
      setTimeout(() => {
          resolve({
              token:'ffasfsafsafas',
              user: {
                  name: 'Pedro',
                  email: 'Pedro@gmail.com'
              }
          })
      })
  })
}