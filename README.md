# Learn Next.js Course

## Table of Content
1. [About the Project](#about-the-project)
2. [Overview](#overview)
3. [Chapter 1: Getting Started](#chapter-1-getting-started)
4. [Chapter 2: CSS Styling](#chapter-2-css-styling)
5. [Chapter 3: Optimizing Fonts and Images](#chapter-3-optimizing-fonts-and-images)
6. [Chapter 4: Creating Layouts and Pages](#chapter-4-creating-layouts-and-pages)
7. [Chapter 5: Navigating Between Pages](#chapter-5-navigating-between-pages)
8. [Chapter 6: Setting Up Your Database](#chapter-6-setting-up-your-database)
9. [Chapter 7: Fetching Data](#chapter-7-fetching-data)
10. [Chapter 8: Static and Dynamic Rendering](#chapter-8-static-and-dynamic-rendering)

## About the Project

Financial dashboard that has:
1. A public home page;
2. A login page;
3. Dashboard pages that are protected by authentication;
4. The ability for users to add, edit and delete invoices.

PS.: The dashboard will also have an accompanying database, which you'll set up later.

By the end of the course, you'll have the essential skills needed to start building full-stack Next.js applications.


## Overview

- Styles: The different ways to style yout application in Next.js;
- Optimizations: How to optimize images, links and fonts;
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

## Chapter 4: Creating Layouts and Pages

### Understanding Layout function

*This function defines a layout that will nest all pages in the directory where it is defined.*

*For example, it can be used in the app/dashboard to share a SideNav with all pages in this directory.*

### Understanding RootLayout function
*This function is **required** in every Next.js application, and any UI added to the root layout will be shared across **all** pages of the application.*

*It can be used to modify HTML and body tags, and add metadata.*

## Chapter 5: Navigating Between Pages

### Optimizing navigation

Instead of using an HTML tag to navigate between pages, use the Link component from next/link.

❌ Using the HTML component: the page always refreshes after a click;<br>
✅ Using the Link component from next/link: navigate between the pages without seeing a full refresh.

*💡 To improve the navigation experience, Next.js automatically code splits your application by route segments. This is different from a traditional Reat SPA, where the browser loads all your application code on the initial load.*

## Chapter 6: Setting Up Your Database

### Deploying the project with Vercel
- Whenever you push changes to your **main** branch, Vercel will automatically redeploy your application with no configuration needed 
- When opening pull requests, you'll also have a instant preview URLs which allow to catch deployment errors early and share a preview of your project with the team members for feedback

### Lessons Learned
1. How to deploy a Project using Vercel;
2. How to connect with a PostgreSQL database;
3. Review of SQL commands, such as *CREATE TABLE* and *INSERT*, for creating tables and populating them based on *placeholder-data.ts* file.

**How to connect to a local PostgreSQL database: tutorial available [here](https://medium.com/@dekadekadeka/next-js-tutorial-with-local-database-quick-start-guide-394d48a0aada).**

## Chapter 7: Fetching Data

### Using Server Components to fetch data
By default, Next.jsapplications use React Server Components. These components are rendered on the server and sent to the client as static HTML. This is a relatively new approach, and there are several benefits to using them:

- Server Components *support JavaScript Promises, providing a solution for asynchronous tasks* like data fetching natively. You can use async/await syntax without needing to use useEffect, useState, or other data fetching libraries.

- Server Components *run on the server, allowing you to keep expensive data fetches and logic on the server, only sending the result to the client*.

- Since Server Components run on the server, *you can query the database directly without an additional API layer*. This saves you from writing and maintaining additional code.

*A Server Component was used to show the revenues in this chapter.*

### Understanding request waterfalls
*A ***waterfall** refers to a sequence of network requests that depend on the completion of previous requests. In the case of data fetching, each request can only begin once the previous request has returned data.*

For example, in *app/dashboard/page.tsx*:

```javascript
const revenue = await fetchRevenue();
const latestInvoices = await fetchLatestInvoices(); // wait for fetchRevenue() to finish
const {
  numberOfInvoices,
  numberOfCustomers,
  totalPaidInvoices,
  totalPendingInvoices,
} = await fetchCardData(); // wait for fetchLatestInvoices() to finish
```

This pattern in not necessarily bad. There may be cases where you *want waterfalls because you want a condition to be satisfied before you make the next request*. For example, you might want to fetch a user's ID and profile information first. Once you have the ID, you might the proceed to fetch their list of friends. In this case, each request is contingent on the data returned from the previous request.

*Warning*: This behavior can also be unintentional and impact performance!

### Understanding parallel data fetching
*A common way to avoid waterfalls is to initiate all data requests at the same time - in parallel.*

In JavaScript, you can use the *Promise.all()* or *Promise.allSettled()* functions to *initiate all promises at the same data*.

For example, in *app/lib/data.ts*, you used:
```javascript
    const data = await Promise.all([
      invoiceCountPromise,
      customerCountPromise,
      invoiceStatusPromise,
    ]);
```

Then, you can:
- Start executing all data fetches at the same time, which is faster than waiting for each request to complete in a waterfall;
- Use a native JavaScript pattern than can be applied to any library or framework.

However, there is one disadvantage of relying only on this JavaScript pattern: what happens if one data request is slower than all the others? Let's find out more in the next chapter.

## Chapter 8: Static and Dynamic Rendering

There are two limitations to the current setup:
- The data requests are creating an unintentional waterfall;
- The dashboard is static, so any data updates will bot be reflected on your application.

### Static Rendering
*With static rendering, data fetching and rendering happens on the server at **build time** (when you deploy) or when revalidating data.*

There are a couple of benefits of static rendering:
- Faster websites: prerendered content can be cached and globally served when deployed to platforms like Vercel;
- Reduced Server Load: because the content is cached, your server does not have to dynamically generate content for each user request;
- SEO: prerendered content is easier for seacrh engine crawlers to index, as the content is already when the page  loads.

Static rendering is useful for UI with *no data* or *data that is shared across users*, such as a static blog or a product page. It might **not be good fit for a dashboard** that has a **personalized data which is regularly updated**.

### Dynamic Rendering

*With dynamic rendering, content is rendering on the server for each user at **request time** (when the users visits the page).*

There are a couple of benefits of dynamic rendering:
- Real-Time Data: dynamic rendering allows your application to display real-time or frequently updated data. This is ideal for applications where data changes often;
- Use Specific Content: it's easier to serve personalized content, such as dashboards or user profiles, and update the data based on user interaction;
- Request Time Information: dynamic rendering allows you to access information that can only be known at request time, such as cookies or the URL search parameters.

*Adding an artificial 3-second delay to simulate a slow data fetch in the fetchRevenue function*, the results is that now your whole page is blocked from showing UI to the visitor while the data is being fetched. Which brings us to a common challenge developers have to solve:*

*With dynamic rendering, **your application is only as fast as your slowesr data fetch!***