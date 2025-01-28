# Learn Next.js

## About Project

Financial dashboard that has:
1. A public home page;
2. A login page;
3. Dashboard pages that are protected by authentication;
4. The ability for users to add, edit and delete invoices.

PS.: The dashboard will also have an accompanying database, which you'll set up later.

By the end of the course, you'll have the essential skills needed to start building full-stack Next.js applications.


## Overview

- Styles: The diferente ways to style yout application in Next.js;
- Optimizations: HOw to optimize images, links and fonts;
- Routing: How to create nested layouts and pages using file-system routing;
- Data Fetching: How to set up a Postgres database on Vercel, and best practices for teaching and streaming;
- Search and Pagination: How to implemente search and pagination using URL search params;
- Mutating Data: How to mutate data using React Server Action, and revalidate the Next.js cache;
- Error Handiling: How to handle general and 404 not found errors;
- Form Validation and Acessibility: How to do server-side form validation and tips for improving acessibility;
- Authentication: How to add authentication to your application using NextAuth.js and Middleware;
- Metadata: How to add metadata and prepare your application for social sharing.


## Chapter 1: Getting Started

### Creating a new project

*Recommendation: using pnpm (faster and more efficient than npm or yarn)*

1. Installing pnpm:
```
npm install -g pnpm
```

2. Creating a Next.js app
```
npx create-next-app@latest nextjs-dashboard --example "https://github.com/vercel/next-learn/tree/main/dashboard/starter-example" --use-pnpm
```

This command uses create-next-app, a CLI tool that sets up a Next.js application for you. In the command above, you're also using the *--example* flag with the starter examplo for this course.

### Understanding the basic structure of the Next.js app

- **/app**: Contains all the routes, components and logic for you application, this is where you'll be mostly working from
- **/app/lib**: Contains functions used in your application, such as reusable utility functions and data fetching functions
- **/app/ui**: Contains all the UI components for your application, such as cards, tables, and forms. To save time, we've pre-styled these componenets for you
- **/public**: Contains al  the static assets for your application, such images
- **Config Files**: You'll also notice config files such as *next.config.ts* at the root of your application. Most of these files are created and pre-configured when you start a new project using *create-next-app*. You'll not need to modify them in this course.

### Running the development server

1. Install the project's package
```
pnpm i
```

2. Start the development server
```
pnpm dev
```

## Chapter 2: CSS Styling

### Understanding Tailwind

*Tailwind is a CSS framework that speeds up development process by allowing you to quickly write utility classes directly in your React code.*

In Tailwind, you style elements by adding class names. For example, adding *text-blue-500* will turn the *h1* text blue.

### Understanding CSS Modules
*CSS Modules allow you to scope CSS to a componenet by automatically creating unique class name, so you don't have to worry about style collisions as well.*

1. Creating the CSS Module
```
<component-name>.module.css
.css-module-class-name {
    // style here
}
```

2. Using the CSS Module in the component (importing styles is mandatory)
```
<div className={styles.css-module-class-name}>
```

### Understanding clsx library
*clsx is a library that lets you toggle class names easily.*

For example:
- Suppose that you want to create an *InvoiceStatus* component which accepts *status*. The status can be 'pending' or 'paid'.
- If it's 'paid', you want the color to be green. If it's 'pending', you want the color to be gray.

Using clsx, it is possible to conditionally aplly the classes, like this:
```javascript
import clsx from 'clsx';
 
export default function InvoiceStatus({ status }: { status: string }) {
  return (
    <span
      className={clsx(
        'inline-flex items-center rounded-full px-2 py-1 text-sm',
        {
          'bg-gray-100 text-gray-500': status === 'pending',
          'bg-green-500 text-white': status === 'paid',
        },
      )}
    >
    // ...
)}
```

## Chapter 3: Optimizing Fonts and Images

### Understanding next/font
*When using next/font module, Next.js automatically optimizes fonts in the application, because it downloads font files at build time and hosts them with your other static assets (this means when a user visits your application, there are no additional newtwork requests for fonts).*

### Adding fonts to application
Creating *fonts.ts* file at the */app/ui* folder. Later, import and export the fonts to be used in the application, like this:
```
import { Inter } from 'next/font/google';
 
export const inter = Inter({ subsets: ['latin'] });
```
Now, the Inter font can be imported and used at any component.

### Uderstanding Image component
*The Image component is a extension of the HTML img tag, and comes with automatic image optmization, such:*
- Preventing layout shift automatically when images are loading
- Resizing images to avoid shipping large images to devices with a smaller viewport
- Lazy loading images by default (images load as they enter the viewport)
- Serving images in modern formats (WebP and AVIF), when the browser supports it

*Important:*
It's a good practice to set the width and height of images to avoid layout shift, these should be an aspect ratio *identical* to the source image. These values are *not* the size image is rendered, but instead the size of the actual image file used to understanding the aspect ratio.