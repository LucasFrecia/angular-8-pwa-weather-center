# Weather Center

Angular 8 project built by Lucas Frecia for a jot test.

### Installation

After cloning, install with yarn, run the production build, and run the server to see tha app running as a PWA (if using npm replace yarn with npm)

```sh
$ yarn
$ ng build --prod
$ yarn start:pwa
```
Head to http://localhost:8080/ to see the app running.

For a development server just serve with:

```sh
$ yarn start
```

### E2E Testing

TODO 22/09

### Plugins

Some of the libs included that make for a better user and developer experience are: 

| Plugin | README |
| ------ | ------ |
| @ngxs/store | https://ngxs.gitbook.io/ngxs/ |
| @angular/flex-layout | https://github.com/angular/flex-layout |
| @angular/pwa | https://angular.io/guide/service-worker-getting-started |
| @angular/material | https://material.angular.io/guides |

### Why @ngxs over @ngrx?

I decided to go with ngxs for this test because it is actually the underdog but in my experience it has shown to be a great library for managing state. Having started and worked in many projects with ngrx, I find that ngxs is great for devs who come from Java, .net or any other OOP language, so it can serve in many cases to teach to new devs.

### Why PWA?

The PWA experience really changes how the user interacts with our application. It not only allows him to access and view a weba pp as if it where a native app, but also increases speed by an order of magnitude and even allows for browsing without a connection with cached data. I decided to add this since I think it will be an important player n the market the years to come.
