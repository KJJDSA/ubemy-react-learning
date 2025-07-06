import Header from './components/Header/Header.jsx';
import CoreConcepts from './components/CoreConcepts.jsx';
import Examples from './components/Examples.jsx';

function App() {


  return (
    <div>
      <Header /> {/* 이제 state로 컴포넌트가 분리되었기 때문에 Examples 가 변해도 앞부분이 변하지 않는다. */}
      <main>
        <CoreConcepts />
        <Examples />
      </main>
    </div>
  );
}

export default App;
