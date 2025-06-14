# PDF Merger and Reorder Web Application

A simple, fast, and free web application built with **Next.js** that allows you to upload multiple PDFs, reorder pages via drag-and-drop, remove unwanted pages, and merge them into a single document — all through an intuitive interface.

## 🚀 Features

✅ **Upload Unlimited PDFs**  
Upload as many PDFs as you want in a single session.

✅ **Reorder Pages Easily**  
Drag and drop pages to rearrange them in any order.

✅ **Remove Any Page**  
Select and remove specific pages you don't need.

✅ **Merge with One Click**  
Combine all pages into a single merged PDF with a single click.

✅ **Completely Free**  
No hidden charges. No watermark. No limits.

✅ **User-Centric & Minimal UI**  
A clean, distraction-free interface designed for simplicity and ease of use.

---

## 🛠 Tech Stack

- **Next.js 15**
- **React 18**
- **Tailwind CSS 4**
- **pdf-lib**
- **pdfjs-dist**
- **react-pdf**
- **react-beautiful-dnd**
- **Radix UI**
- **Lucide React**
- **UUID**

---

## 📦 Installation

1️⃣ Clone the repository:

```bash
git clone https://github.com/your-username/pdf-merger-reorder.git
cd pdf-merger-reorder
```

2️⃣ Install dependencies:

```bash
npm install
```

3️⃣ Run the development server:

```bash
npm run dev
```

Open http://localhost:3000 to view the app in your browser.

---

## 🔨 Build for Production

To build the app for production:

```bash
npm run build
npm start
```

---

## 📁 Project Structure

```bash
├── public
├── src/
│   ├── app/
│   │   ├── editor/
│   │       └── page.tsx
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── ui/     # ShadCN Components files
│   │   └── UI Components files
│   ├── context/
│   │   └── PDFContext.tsx
│   ├── lib/
│   │   └── utils.ts
│   ├── pdfjs.dist.d.ts
│   └── types.ts
├── package.json\
└── README.md
```

---

## 🙌 Acknowledgements

- **Next.js**

- **pdf-lib**

- **react-pdf**

- **Tailwind CSS**

- **react-beautiful-dnd**

- **Radix UI**

---

## 📄 License

This project is licensed under the MIT License.
