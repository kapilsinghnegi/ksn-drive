# KSN Drive

A modern, full-stack cloud storage platform inspired by Google Drive, built with **Next.js, TypeScript, Appwrite, and Tailwind CSS**.

KSN Drive provides a clean interface for managing files and folders, uploading documents, organizing content, and interacting with cloud storage through a responsive web application.

> **Live Demo:** [ksn-drive.vercel.app](https://ksn-drive.vercel.app/)

## ✨ Features

- 🔐 **Authentication** — Secure user authentication and account management
- 📁 **File Management** — Upload, organize, view, and manage files
- 📂 **Folder Organization** — Organize files using folders and structured navigation
- 🔎 **Search** — Quickly find files and folders
- 📊 **Storage Analytics** — Visualize storage usage and file statistics
- 📤 **File Uploads** — Drag-and-drop file upload support
- 🔗 **File Sharing** — Share files with other users
- 🗑️ **File Management Actions** — Rename, delete, download, and manage stored files
- 📱 **Responsive UI** — Optimized for desktop, tablet, and mobile devices
- ⚡ **Modern UI** — Built with Tailwind CSS and shadcn/ui
- 🛡️ **Form Validation** — Type-safe validation using React Hook Form and Zod

## 🛠️ Tech Stack

### Frontend

- **Next.js**
- **React**
- **TypeScript**
- **Tailwind CSS**
- **shadcn/ui**
- **Lucide React**

### Backend & Services

- **Appwrite**
- **Node.js**
- **Appwrite Storage**

### Libraries & Tools

- **React Hook Form**
- **Zod**
- **React Dropzone**
- **Recharts**
- **ESLint**
- **Prettier**
- **pnpm**

## 🏗️ Architecture

The application uses Next.js as the primary application framework, with Appwrite providing backend services such as authentication and cloud storage.

```text
┌──────────────────────────────┐
│          KSN Drive            │
│        Next.js + React        │
└──────────────┬───────────────┘
               │
       ┌───────┴────────┐
       │                │
       ▼                ▼
 Authentication      Storage
       │                │
       └───────┬────────┘
               ▼
            Appwrite
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js 18+
- pnpm
- An Appwrite project

### 1. Clone the repository

```bash
git clone https://github.com/kapilsinghnegi/ksn-drive.git

cd ksn-drive
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Configure environment variables

Create a `.env.local` file in the project root and add the required Appwrite configuration:

```env
NEXT_PUBLIC_APPWRITE_ENDPOINT=
NEXT_PUBLIC_APPWRITE_PROJECT=
NEXT_PUBLIC_APPWRITE_DATABASE=
NEXT_PUBLIC_APPWRITE_USERS_COLLECTION=
NEXT_PUBLIC_APPWRITE_FILES_COLLECTION=
NEXT_PUBLIC_APPWRITE_BUCKET=
NEXT_APPWRITE_SECRET_KEY=
```

> Do not commit your environment variables or API credentials to the repository.

### 4. Start the development server

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
```

## 📦 Available Scripts

| Command             | Description                      |
| ------------------- | -------------------------------- |
| `pnpm dev`          | Start the development server     |
| `pnpm build`        | Create a production build        |
| `pnpm start`        | Start the production server      |
| `pnpm lint`         | Run ESLint                       |
| `pnpm format`       | Format the project with Prettier |
| `pnpm format:check` | Check code formatting            |

## 📁 Project Structure

```text
ksn-drive/
├── app/              # Next.js routes and application pages
├── components/       # Reusable UI components
├── constants/        # Application constants
├── lib/              # Appwrite and application utilities
├── public/            # Static assets
├── types/             # TypeScript type definitions
├── next.config.ts     # Next.js configuration
├── package.json       # Dependencies and scripts
└── tsconfig.json      # TypeScript configuration
```

## 📄 License

This project is available for educational and personal use.
