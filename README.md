## jakk-backend

<!-- jakk-backend features -->
This is an authentication API with signup and login routes. Built with Express, Node and Mongoose (Mongo DB)
This API gives allows for sign up, login and update history post requests.

- This app demonstrates the use of basic concepts of the backend javasript technologies 
  - Express Routes
  - Mongoose Models 
  - JSON Web Token
  
<!-- REQUIRED INSTALLATION -->

## Required Installations

- Npm

<!-- INSTALLATION -->

## Installation of This Repository

Once you have installed the required packages shown on the [Required Installations](#required-installations), proceed with the following steps

Clone the Repository

```Shell
your@pc:~$ git clone git@github.com:UgegeDaniel/jakk-backend.git
```

Move to the downloaded folder

```Shell
your@pc:~$ cd jakk-backend
```

Install all packages

```Shell
your@pc:~$ npm install --legacy-peer-deps
```

Open the app

```Shell
your@pc:~$ npm start
```

## Sample API call 

 _Sign up at https://www.mongodb.com to get *Mongo DB connection URL* ._

Visit https://github.com/UgegeDaniel/jakk-backend for sample API call  

## API call Examples
```js
const options = {
    method: 'POST',
    headers: { 'Content-type': 'application/json' },
};

const baseUrl = 'https://jakk-backend.herokuapp.com'
```

Sign Up User
```js
const signup = async (credentials) => {
    const { email, password, userName } = credentials
    const response = await fetch(`${baseUrl}/student/signup`, { ...options, body: JSON.stringify({ email, password, userName }) })
    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('student', JSON.stringify(data))
        return { msg: 'success', data }
    } else {
        const error = data.error
        return { msg: 'error', error }
    }
}
```
Example response 
'''json

```
login User

```js
const login = async (credentials) => {
    const { email, password } = credentials
    const response = await fetch(`${baseUrl}/student/login`, { ...options, body: JSON.stringify({ email, password }) })
    const data = await response.json();
    if (response.ok) {
        localStorage.setItem('student', JSON.stringify(data))
        return { msg: 'success', data }
    } else {
        const error = data.error
        return { msg: 'error', error }
    }
}
```
Example response 
'''json
```
Update History 
```js
const updateHistory = async (email, newData) => {
    const response = await fetch(`${baseUrl}/student/updateHistory`, { ...options, body: JSON.stringify({ email, newData }) })
    const data  = await response.json();
    if (!response.ok) {
       return
    }
    if (response.ok) {
        localStorage.setItem('student', JSON.stringify(data))
        return
    }
}
```
## License
