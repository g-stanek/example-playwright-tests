import { Browser, chromium, test as setup } from "@playwright/test";
import { USER } from "../fixtures/user";

setup("authenticate user", async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const fetcher = context.request;
  fetcher.post(process.env.BASE_URL + "/credentials", {
    form: {
      username: USER.email,
      password: USER.password,
    },
  });

  await context.storageState({ path: USER.file });
});
