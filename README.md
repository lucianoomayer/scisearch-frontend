# 🌐 SciSearch — Frontend

**SciSearch** is a web platform designed to streamline and centralize the search for scientific literature. This repository contains the **frontend**, built with **React**, responsible for the user interface, search flow, authentication, filtering,and management of favorite articles.

**Backend repository:**  
>https://github.com/lucianoomayer/scisearch-backend

**Live version (Vercel):**  
>https://scisearch-lucianoomayer.vercel.app

**Note:** Because the backend runs on a platform with cold start, the first request — or any request after a period of inactivity — may take a few seconds to respond.

## Architecture Overview

### **Tech Stack**
- React (JavaScript)
- Fetch API for HTTP requests
- Deployed on Vercel

### **Communication**
- Integration with the SciSearch Backend (Spring Boot)
- JWT-based authentication for secure session handling

## Key Features

- **Unified Article Search**  
  Search articles across multiple scientific databases through a clean and centralized interface.

- **Advanced Filters**  
  Refine search results using publication year filtering.

- **User Authentication**   
  User registration, login, and persistent sessions.

- **Favorites System**  
  Save, access, and manage your favorite articles.

- **Full Backend Integration**  
  All operations—search, authentication, filters, and favorites—are fully integrated with the backend REST API.
