/* 시작을 어떻게 하는가? 
1. 레이아웃 보기. 
2. 몇개의 블록으로 이루어졌는가 확인하기. 
3. 첫번 째 블록(유저 인터페이스)부터 시작하기 */
import Player from "./components/Player"

function App() {
  

  return (
    <main>
      <div id="game-container">
        <ol id="players">
          <Player initialName="Player 1" symbol="X" />
          <Player initialName="Player 2" symbol="O" />
        </ol>

        GAME BOARD
      </div>

      LOG
    </main>
  )
}

export default App
