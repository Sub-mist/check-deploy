# CheckDeploy

![CheckDeploy Screenshot](./public/screenshot/Screenshot%20CheckDeploy.png)
_Light Mode View_

![CheckDeploy Dark Mode](./public/screenshot/dark%20screenshot.png)
_Dark Mode View_

Hey there! 👋

Just a handy little tool I put together to help me (and maybe you!) figure out what's missing before hitting that "deploy" button. Think of it as a quick pre-flight check so you don't forget the boring stuff like sitemaps, robots.txt, or env examples.

It's not a serious, high-end security audit—just a helpful sidekick to give you a rough idea of what's left to do.

## How it Works

CheckDeploy is designed to be **privacy-friendly** and super light on your AI tokens:

- **It scans your file structure**: It looks at your folder names and file list (e.g., "Oh, you have a `package.json` and a `src/utils` folder").
- **It DOES NOT read your code**: The actual code inside your files stays right on your computer. The AI only sees the _names_ of the files to figure out what's missing.
- **AI-Powered Advice**: It uses AI to compare your project structure against common industry standards for your tech stack.

## Getting it Running

To get the scanning magic working, you'll need to run both the frontend and a tiny background scanner.

### 1. The Basics

1. Make sure you've got **Node.js** installed.
2. Clone this repo and grab the dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your API key:
   ```env
   API_KEY=your_api_key_here
   ```

### 2. Launch (You'll need two terminal tabs)

**Tab 1: The UI**

```bash
npm run dev
```

**Tab 2: The Scanner**

```bash
npm run server
```

### 3. Let's go!

1. Open up `http://localhost:5173` in your browser.
2. Paste the **full path** to your project (like `C:\Users\You\Projects\my-cool-app`).
3. Hit **Check** and see what's up!

**Note:**

- You might be using different AI Model then Gemini, so you can change the Model from `src/hooks/useAiAnalysis.ts`.

## Just a heads up

This is just a helper tool for personal projects. If you're building something huge or super sensitive, definitely do a proper manual check too!

---

Happy building! 🛠️
