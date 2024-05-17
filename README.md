# sonata

music client for farcaster

supports music on

- Spotify
- Soundcloud
- Sound.xyz
- Zora (coming soon)

# Setup

1. Download and install Docker: https://docs.docker.com/get-docker/
2. Run Docker on your machine
3. Run the following in the root of the sonata codebase:
   `npx supabase init`
4. Run the starting function
   `npx supabase start`
5. This will now have the database live with some production data available to you
6. Any time you make DB migrations run the following:
   `npx supabase db reset`
7. Run
   `npx supabase status`
8. Now go to .env file and fill the env variables

```
NEXT_PUBLIC_SUPABASE_URL={API URL}
NEXT_PUBLIC_ANON_KEY={anon key}
SUPABASE_URL={API URL}
SUPABASE_KEY={service_role key}
```

## Authors

- [@sweetmantech](https://github.com/sweetmantech) ([warpcast](https://warpcast.com/sweetman-eth))

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
