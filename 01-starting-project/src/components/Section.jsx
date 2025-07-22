// 구조를 만드는 재사용 가능한 컴포넌트를 만들 수도 있다. 

export default function Section({ title, children, ...props }) {
  return ( // id 속성 또한 props로 전달받는다.
    // props를 통해 전달받은 속성들을 spread 연산자로 전달하는 패턴으로 모든 속성을 전달하는 번거로움을 피할 수 있다. 
    <section {...props}> 
      <h2>{title}</h2>
      {children}
    </section>
  );
}