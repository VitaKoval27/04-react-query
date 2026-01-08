# React Data Fetching with TanStack Query (HW-04) 🛰️

A React application focused on powerful asynchronous state management using **React Query** (TanStack Query) to handle API requests, caching, and synchronization.

---

### 📝 Project Overview
This project demonstrates how to fetch data from an external API efficiently. Instead of manual state management with `useEffect`, it utilizes React Query to simplify data fetching, reduce boilerplate code, and improve the user experience with automatic caching and background updates.

### 🛠 Tech Stack
![React](https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![React Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=flat-square&logo=react-query&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)

### 🔑 Key Implementations & My Work:
- **Server State Management:** Replaced manual `fetch` calls with `useQuery` hooks for cleaner and more maintainable code.
- **Auto-Caching:** Implemented data caching to minimize network requests and provide an instant UI feel.
- **Loading & Error States:** Developed robust UI feedback for users during data transitions (`isLoading`, `isError`).
- **Data Synchronization:** Configured stale-time and revalidation settings to keep the data fresh.
- **API Integration:** Successfully connected to a REST API to fetch and display dynamic content.

---

### 🚀 Learning Outcomes
* Moving beyond `useEffect` for data fetching.
* Understanding **Stale-While-Revalidate** caching logic.
* Handling global loading indicators and error boundaries in React.

---

### 🛠 Installation & Setup
1. Clone the repository:
   ```bash
   git clone [https://github.com/VitaKoval27/04-react-query.git](https://github.com/VitaKoval27/04-react-query.git)
