/** @type {import('tailwindcss').Config} */
module.exports = {
  // content 에 대상이 되는 파일 범위를 설정해야함
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: { // 이곳에서 외부 폰트를 적용할 수 있다.
    extend: {
      fontFamily: {
        title: ['"pacifico"', 'cursive'], // parcifico: 구글에서 제공하는 특별한 폰트이므로 '" "' 형식을 따라야함. cursive는 기본내장이므로 불필요 
      }
    },
  },
  plugins: [],
}