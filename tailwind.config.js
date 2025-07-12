/** @type {import('tailwindcss').Config} */
module.exports = {
  // content 에 대상이 되는 파일 범위를 설정해야함
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}