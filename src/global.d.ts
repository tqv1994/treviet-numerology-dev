/// <reference types="@sveltejs/kit" />

import type { User } from '$lib/store/auth';

declare global {
  declare namespace App {
    interface Locals {
      user?: User;
    }

    interface Session {
      user?: User;
    }
  }
}
