# sonata

music client for farcaster

supports music on

- Spotify
- Soundcloud
- Sound.xyz
- Zora (coming soon)

# Setup

1. Download and install Docker: https://docs.docker.com/get-docker/
2. Open the Docker App on your machine. Verify with `docker info`.
3. Use node v20 with `nvm use 20`.
4. Run the following in the root of the sonata codebase:
   `npx supabase init`.
5. Run the starting function
   `npx supabase start`. This will now have the database live with some production data available to you.
6. Run
   `npx supabase status`
7. Now go to .env file and fill the env variables

# DB Issues

- If you see any errors happening db related or, need to make DB migrations run the following: `npx supabase db reset`

```
NEXT_PUBLIC_SUPABASE_URL={API URL}
NEXT_PUBLIC_ANON_KEY={anon key}
SUPABASE_URL={API URL}
SUPABASE_KEY={service_role key}
```

## Authors

- [@sweetmantech](https://github.com/sweetmantech) ([warpcast](https://warpcast.com/sweetman-eth))
- [@ramiechaarani](https://github.com/ramiechaarani) ([warpcast](https://warpcast.com/ramie/))

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
