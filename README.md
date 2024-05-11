# MERN Blog project

You can start the project with Docker by simply running `start.sh` file. If you want to add an user and some data to the database, you can add `--init` flag to the command.

```bash
./start.sh --init
```

This will add runs 3 docker containers: `postgres`, `backend` and `frontend`. It will also add an user with the `{username: 'user1', password: '123123'}` and 14 posts to the database.

If you want to run the project without Docker, you can run the `pnpm dev` command in the `backend` and `frontend` directories. But you need to have a postgres database running on your machine.