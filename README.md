# FitnessTracker

## Setup

### Firebase setup

* Create Firebase project
* Create Firestore database with collection `availableExercises`
* add exercises to collection

### firebase.ts

Create new file `/src/app/firebase.ts` with content implemented as follows:

```typescript
export const firebaseConfig = {
  apiKey: '...',
  authDomain: '...',
  databaseURL: '...',
  projectId: '...',
  storageBucket: '...',
  messagingSenderId: '...',
  appId: '...',
  measurementId: '...'
};
```

You can find actual settings in Firebase settings for your app

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.
