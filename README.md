# DrinkHub client
This application was created to consume the DrinkHub API. It was built with Nuxt and Vuetify.
Here you can sign up with your data and see which drinks users are posting and also post yours.

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
