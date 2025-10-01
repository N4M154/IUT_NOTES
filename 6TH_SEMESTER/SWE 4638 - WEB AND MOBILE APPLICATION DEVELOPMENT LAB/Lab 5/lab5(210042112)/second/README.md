# Lab 5 - React Native (Expo Go)

Lab 5 of the web and mobile application development lab. `by 210042112`

## What it does

- Users can **sign up** with name, email, and password
- Users can **log in** with email + password
- If you're logged in, you get access to two tabs:
  - **Feed Tab** → see posts
  - **Create Post Tab** → make a new post
- Login info is saved locally with AsyncStorage so you don't get
  logged out if you close the app

## My approach

- I used MongoDB to store the userdata and the post data
- For navigation, I used **expo-router** since it makes it easy to
  separate auth screens and app screens.

## Workflow

- **expo-router** → I used route groups:
  - `/(auth)` for login/register
  - `/(tabs)` for feed/create post
  - A root layout decides if the user is logged in or not and
    redirects.
- **AsyncStorage for state** → I stored:
  - `users` → array of `{ name, email, password }`
  - `authToken` → just a string to mean "logged in"
  - `currentUser` → the logged-in user
- **Authentication logic** → Very simple:
  - Register → add user, set token, move to tabs
  - Login → check email/password, set token, move to tabs
  - Logout → clear token, go back to login

## Error Handling I Added

- Stop duplicate registration (check if email already exists)
- Don't allow empty field\
- Handle cases where AsyncStorage is empty or broken (fallback to
  empty list)
- Show a basic error if login fails

## Running the App

1. Install dependencies (inside `second` and `server` folders)

   ```bash
   npm install
   ```

2. Set MongoDB URL in `server.js` file and also set your ip address accordingly.

3. Start Expo:

   ```bash
   npm start expo
   ```

## How to Use It

- First time → You'll see the login screen → tap "Sign Up" → register
  → auto-login → see feed.\
- Next time → If a token exists, you go straight to tabs. If not,
  login again.
- Tabs:
  - Feed → see posts
  - Create Post → add a post
- Logout → clears token and goes back to login

## File Structure (Important Parts)

    app/
    ├── (auth)/
    │   ├── login.tsx
    │   └── register.tsx
    ├── (tabs)/
    │   ├── index.tsx      # Feed
    │   └── explore.tsx    # Create Post
    └── utils/
        └── auth.ts        # AsyncStorage helpers

## Challenges I Faced

- **Navigation state** → Sometimes the app didn't know if the user was
  logged in or not. I fixed this by letting the root layout check the
  token and decide where to send the user.
- **AsyncStorage issues** → Sometimes it returned `null` or old data.
  I wrapped my reads/writes to handle missing data safely.
- **Axios Error** → In the mobile the backend was not working so I took set the url to be network specific, which you have to change according to your ip address.

## Dependencies I Used

- `@react-native-async-storage/async-storage` → to save data locally
- `expo-router` → navigation
- `axios` → backend calls
- `@expo/vector-icons` → icons

This is basically my thought process for building the app. The focus was
**understanding the flow** (login → auth check → feed/create post).
