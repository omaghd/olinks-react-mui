# OLinks - React

OLinks lets you customize a page (in realtime) where you can display your important links to share with others.

I would appreciate it if you consider giving me a star for this repo ⭐

## Demo

https://omaghd.com/projects/react/olinks

## Stack

- React >= 18
- React Router v6
- Material UI 5
- Formik
- Yup
- Firebase 9
  - Firebase Authentication
  - Cloud Firestore (Realtime)
  - Cloud Storage

## Features

### As a visitor

- Login / Register
- Visit profiles

### As a user

- Links:
  - Display links in realtime
  - Display views of every link
  - Add new links in realtime
  - Edit existing links in realtime
  - Delete links
  - Show or hide links
  - Preview links
- Profile:
  - Update avatar (profile picture)
  - Update bio, name and/or username
  - Update email
- Settings:
  - Toggle profile visibility
  - Toggle visits counter visibility
  - Customize text & background color
  - Change password

### Other features

- Public and protected routes
- Toggle mode (light or dark)
- Responsive design

## Installation

- Clone the repository

```
git clone https://github.com/omaghd/olinks-react-mui.git olinks
```

- Change directory to the project

```
cd olinks
```

- Install the dependencies

```
yarn
```

- Copy .env file

```
cp .env.example .env.local
```

- Replace firebase configuration with yours in .env.local

```
REACT_APP_API_KEY=""
REACT_APP_AUTH_DOMAIN=""
REACT_APP_PROJECT_ID=""
REACT_APP_STORAGE_BUCKET=""
REACT_APP_MESSAGING_SENDER_ID=""
REACT_APP_APP_ID=""
```

- Run the application

```
yarn start
```

## Collections

### Links

| Field name | Type      |
| ---------- | --------- |
| id         | string    |
| title      | string    |
| url        | string    |
| views      | number    |
| isVisible  | boolean   |
| user_id    | string    |
| createdAt  | timestamp |

### Users

| Field name      | Type      |
| --------------- | --------- |
| bio             | string    |
| username        | string    |
| textColor       | string    |
| backgroundColor | string    |
| visits          | number    |
| displayVisits   | boolean   |
| isVisible       | boolean   |
| geo             | map       |
| userAgent       | string    |
| uid             | string    |
| createdAt       | timestamp |

## Author

| Website  | [omaghd.com](https://omaghd.com)             |
| -------- | -------------------------------------------- |
| LinkedIn | [/in/omaghd](https://linkedin.com/in/omaghd) |
| Twitter  | [/omaghd](https://twitter.com/OmaghD)        |
| GitHub   | [/omaghd](https://github.com/omaghd)         |

## License

This project is [MIT licensed](https://choosealicense.com/licenses/mit/).

Kindly give me a credit if you're going to use this project somewhere ❤️
