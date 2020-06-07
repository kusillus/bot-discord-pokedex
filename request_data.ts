const response = await fetch('https://jsonplaceholder.typicode.com/todos/1'),
    data = await response.json()

export default data