// src/main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
// Import provideHttpClient and withInterceptors
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { App } from './app/app'; // Assuming 'App' is your root standalone component
import { routes } from './app/app.routes'; // Your application routes


// Import your AuthInterceptor
import { AuthInterceptor } from './app/auth-interceptor';


bootstrapApplication(App, {
  providers: [
    provideRouter(routes),

    provideHttpClient(
      withInterceptors([
        AuthInterceptor 
       
      ])
    )
  ]
});
