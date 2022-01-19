import {createBasicAuthHandler} from "basic-auth-for-cloudflare-pages-middleware";
export const onRequest = [createBasicAuthHandler({ name: env.AUTH_USERNAME, password: env.AUTH_PASSWORD })];
