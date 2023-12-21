# DrinkHub client

## How to run this project
1. Create a `.env` file with the following values
```yaml
API_HOST_ADDRESS=<drink-hub-api-address>
```

2. Install dependencies
```bash
npm install 
```

3. Run in dev mode
```bash
npm run dev 
```

## Folder structure
```bash
- assets: scss files
- components: components files divided by context
- domain: entities and service with business rules
- infra: api communication and pinia store
- middleware: Nuxt router middlewares
- pages: Nuxt pages
- utils: content keys and form validations
```
