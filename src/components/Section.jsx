// 구조를 만드는 재사용 가능한 컴포넌트를 만들 수도 있다. 

export default function Section({ title, id, children }) {
  return ( // id 속성 또한 props로 전달받는다.
    <section id={id}> 
      <h2>{title}</h2>
      {children}
    </section>
  );
}