# Income & Expense Calculator

A responsive personal finance dashboard to track cash flow, log income and expenses, and manage budgets in real time.



---

## 📌 Features

- **Real-Time Summary Metrics:** Dynamically computes Total Income, Total Expenses, and Net Balance.
- **Smart Color-Coding:** Net Balance highlights in green (positive), red (negative), or blue (neutral).
- **Full CRUD Management:**
  - **Create:** Add transactions with validation (description, amount, type).
  - **Read:** Formatted transaction history list.
  - **Update:** Edit mode with auto-populated form fields and update confirmation.
  - **Delete:** Remove entries by unique identifier.
- **Transaction Filtering:** Filter transactions instantly by **All**, **Income**, or **Expense** without mutating state.
- **Data Persistence:** Automatic saving and loading across browser sessions using `localStorage`.
- **Responsive Dashboard UI:** 2-column layout with constrained internal scroll for transaction history.

---

## 🛠️ Tech Stack

- **HTML5:** Semantic document structure
- **Tailwind CSS (v4):** Modern utility-first styling and responsive grid
- **Vanilla JavaScript (ES6+):** Pure DOM manipulation, event-driven state, and array methods

---

## 🚀 Getting Started

1. Clone or download the repository:
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   ```
2. Open `index.html` directly in any modern web browser, or serve it using Live Server:
   ```bash
   # Optional: using any static server
   npx serve .
   ```

---

## 📄 License
This project is open source and available under the MIT License.

