# Project Management Server
Project created as a guide for cohort 78 (São Paulo Web Dev Jun/2022) at Ironhack São Paulo.

## How to use
- fork this repository
- clone
```
npm i
```

If you don't have a `.env` file, don't worry, there are fallbacks to the env variables.
The only thing you need beyond the dependencies is
- mongo installed locally OR a ATLAS_URI at the `.env` file.
- nodemon installed globally.

## Endpoints
| method | endpoint | body | action |
| --- | --- | --- | --- |
| POST | /projects | JSON | creates a new project |
| GET | /projects | empty | list all projects |
| GET | /projects/:projectId | empty | shows one specific project |
| PUT | /projects/:projectId | JSON | edits specific project |
| DELETE | /projects/:projectId | empty | removes a specific project |
| POST | /tasks | JSON | creates a new project |
