

export async function getUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users');
  if (!response.ok) {
    throw new Error('Den er helt gal');
  }
    return response.json();
}

export async function getUser({ params }) {
    console.log(params)
  const response = await fetch(`https://jsonplaceholder.typicode.com/users/${params.id}`)
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
        return response.json(); 
}
