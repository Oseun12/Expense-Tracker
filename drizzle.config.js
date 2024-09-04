// import type { Config } from 'drizzle-kit'; 
export default {
    schema: "./utils/schema.jsx",
    dialect: 'postgresql',
    dbCredentials: {
      url: NEXT_PUBLIC_DATABASE_URL,
    }
  };