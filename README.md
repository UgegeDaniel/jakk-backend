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

_ Visit https://github.com/UgegeDaniel/jakk-backend for sample API call _

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

<h4> Example response </h4>
<h5> Example Error response </h5>
(without credentials)

```json
{
    "error": "Please fill in a valid email, user name and a password"
}
```

(with a weak password --passwords should contain Uppercase, lowercase, numbers and symbols)

```json
{
    "error": "Please enter a strong password"
}
```

<h5> Example Success response </h5>

(with valid credentials)

```json 
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzVhZTY1ODZiMTNjYTBmZDM3MzQwZjciLCJpYXQiOjE2NjY5MDE1OTIsImV4cCI6MTY2NzE2MDc5Mn0.whyFJ-cH8jsp2RsDAMpsx2QrN6BBtnqzSXxUD3qrLGY",
    "email": "janeDoe@gmail.com",
    "userName": "Jane Doe",
    "history": []
}
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
