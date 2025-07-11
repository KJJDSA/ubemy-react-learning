import AuthInputs from './components/AuthInputs.jsx';
import Header from './components/Header.jsx';

export default function App() {
  return (
    <>
      <Header />
      {/* 바닐라css 단점: css 파일을 분리해도 스코프되지 않는다.(Header.jsx 바깥의 header 태그에 똑같이 적용되는 모습) */}
      <header><h1>이제 여기에는 스타일이 적용되지 않음</h1></header>
      <main>
        <AuthInputs />
      </main>
    </>
  );
}
