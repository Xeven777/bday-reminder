# Birthday Reminder App 🎉
![thumbnail](src/app/opengraph-image.jpg)

## 🗂️ Description

The Birthday Reminder App is a full-stack application designed to help users keep track of their friends' and family members' birthdays. The app allows users to add birthday reminders, generate AI-powered birthday wishes, and send automated email reminders. This project is perfect for developers looking for a comprehensive example of a real-world application built with Next.js, TypeScript, and Prisma.

The app is built with a focus on user experience, featuring a clean and intuitive interface, and is optimized for performance and scalability.

## ✨ Key Features

### Core Features

* **Birthday Reminder Management**: Add, edit, and delete birthday reminders with details such as name, birthday, email, and relationship.
* **AI-Powered Birthday Wishes**: Generate personalized birthday wishes using AI models.
* **Automated Email Reminders**: Send automated email reminders to users and their friends on birthdays.

### User Interface

* **Dashboard**: A user-friendly dashboard to view and manage birthday reminders, with features such as upcoming birthdays, this month's birthdays, and next month's birthdays.
* **Form Components**: Intuitive form components for adding and editing birthday reminders.

## 🗂️ Folder Structure

```mermaid
graph TD;
src-->app;
src-->components;
src-->lib;
src-->actions;
app-->dashboard;
app-->api;
components-->ui;
lib-->utils;
lib-->db;
actions-->ai-wish;
actions-->email;
```

## 🛠️ Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-000?logo=next.js&logoColor=white&style=for-the-badge)
![TypeScript](https://img.shields.io/badge/TypeScript-3178c6?logo=typescript&logoColor=white&style=for-the-badge)
![Prisma](https://img.shields.io/badge/Prisma-4ea94b?logo=prisma&logoColor=white&style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4ea94b?logo=mongodb&logoColor=white&style=for-the-badge)
![Clerk](https://img.shields.io/badge/Clerk-000?logo=clerk&logoColor=white&style=for-the-badge)

## ⚙️ Setup Instructions

To run the project locally, follow these steps:

* Git clone the repository: `git clone https://github.com/Xeven777/bday-reminder.git`
* Install dependencies: `npm install`
* Start the development server: `npm run dev`

## 🤖 GitHub Actions

The project uses GitHub Actions to automate the process of sending birthday wishes. The workflow is defined in the `.github/workflows/actions.yml` file.

```mermaid
graph TD;
workflow-->daily-job;
daily-job-->send-wishes;
```

## 📝 Configuration Files

The project uses several configuration files, including:

* `.eslintrc.json`: ESLint configuration file that extends the Next.js core web vitals configuration.
* `.vscode/settings.json`: Visual Studio Code settings file with a single setting for Next.js.
* `postcss.config.mjs`: PostCSS configuration file that uses the Tailwind CSS plugin.
* `next.config.mjs`: Next.js configuration file that enables PWA support with custom settings.
* `prisma/schema.prisma`: Prisma schema file that defines the database model for the application.
* `tsconfig.json`: TypeScript configuration file that sets up the compiler options for the project.



<br><br>
<div align="center">
<img src="https://avatars.githubusercontent.com/u/115650165?v=4" width="120" />
<h3>Anish</h3>
<p>Passionate developer with a love for problem-solving, efficient and creative thinking.</p>
</div>
<br>
<p align="right">
<img src="https://gitfull.vercel.app/appLogo.png" width="20"/>  <a href="https://gitfull.vercel.app">Made by GitFull</a>
</p>
    