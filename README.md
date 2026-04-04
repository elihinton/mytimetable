# MyTimetable

![banner image](public/banner.png)

MyTimetable is a simple drag-and-drop timetable planner for Adelaide University students. Easily organise your course classes and create the perfect timetable with this tool by the CS Club Open Source Team.

## Development

1. Install the dependencies

```sh
pnpm i
```

2. Copy `.env.example` to a new file `.env`

3. Set up the backend (for share functionality):

   ```sh
   cd backend
   pnpm install
   pnpm approve-builds  #select better-sqlite3

   pnpm run db:generate # only run these two commands if you changed sqlite db schema
   pnpm run db:migrate
   ```

4. Run the backend server (in one terminal):

   ```sh
   pnpm run dev
   ```

5. Run the frontend development server (in another terminal):

   ```sh
   cd ../frontend && pnpm run dev
   ```

6. Open <http://localhost:5173> with your browser to see the result.

7. (Optional) Run the tests

```sh
cd frontend && pnpm run test
cd backend && pnpm run test
```

## Run using docker

```sh
docker compose -f docker-compose.dev.yml up --build
```

