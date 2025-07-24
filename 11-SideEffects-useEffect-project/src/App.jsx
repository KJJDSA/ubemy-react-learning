import { useRef, useState, useEffect, useCallback } from "react";

import Places from "./components/Places.jsx";
import { AVAILABLE_PLACES } from "./data.js";
import Modal from "./components/Modal.jsx";
import DeleteConfirmation from "./components/DeleteConfirmation.jsx";
import logoImg from "./assets/logo.png";
import { sortPlacesByDistance } from "./loc.js";

/* 첫 로딩 떄 단 한번만 불러오면 되기 때문에 useEffect를 사용 고려할 수도 있지만, 
localStorage는 navigator 와 다르게 즉발성이므로 굳이 사용할 필요 없으며, 또 APP 안에다 사용할 이유도 없다. 
*/
const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
const storedPlaces = storedIds.map((id) =>
  AVAILABLE_PLACES.find((place) => place.id === id)
);
function App() {
  const modal = useRef();
  const selectedPlace = useRef();
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);
  const [availablePlace, setAvailablePlace] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  /* ⭐️ useEffect 를 사용하면 컴포넌트의 함수가 모두 끝난 뒤에 실행될 수 있도록 할 수 있다. 
  두번째 파라미터에 적힌 조건에 맞으면 재실행 되는데, 빈 배열을 놓을 경우 조건이 없어 앱이 실행되고 한번만 실행될 수 있도록 할 수 있다. */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortedPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );

      setAvailablePlace(sortedPlaces);
    });
  }, []);
  function handleStartRemovePlace(id) {
    /* modal.current.open(); */
    setModalIsOpen(true);
    selectedPlace.current = id;
  }

  function handleStopRemovePlace() {
    /* modal.current.close(); */
    setModalIsOpen(false);
  }

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    /* 
    1. 그냥 사용해도 무한루프에 걸리지 않을 경우
    2. 앱 실행 후 한번만 실행될 필요가 없는 경우
    라면 사이드이펙트 일지라도 UseEffect를 꼭 사용하지 않아도 된다. 
    */
    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
    if (storedIds.indexOf(id) === -1) {
      localStorage.setItem(
        "selectedPlaces",
        JSON.stringify([id, ...storedIds])
      );
    }
  }

  const handleRemovePlace = useCallback(
    /* ⭐️ useCallback 
    handleRemovePlace 가 재렌더링 될 때 마다 자식 컴포넌트의 useEffect가 재실행되는 문제가 발생. 
    이를 해결하고 싶다면 handleRemovePlace 이 재렌더링 될 때 마다 삭제되지 않으면 된다. 
    useCallback 은 리액트 기본 내장 훅이며, 이것으로 감싼 함수는 재렌더링에도 새로 인스턴스를 생성하지 않고 기존 인스턴스를 사용하게 된다.
    인스턴스의 메모리주소가 바뀌지 않으므로(참조값이 매번 바뀌지 않으므로) useEffect에서 무한루프를 걱정하지 않고 의존성에 해당함수를 넣을 수 있다.
    */
    function handleRemovePlace() {
      setPickedPlaces((prevPickedPlaces) =>
        prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
      );
      setModalIsOpen(false);

      const storedIds =
        JSON.parse(localStorage.getItem("selectedPlaces")) || [];
      localStorage.setItem(
        "selectedPlaces",
        JSON.stringify(storedIds.filter((x) => x !== selectedPlace.current))
      );
    },
    /* 
    의존성을 넣는 곳. 
    useEffect와 다르게 함수 대신 직접 사용된 props, state, context value 만 추가하고 그 외는 추가하지 않는다. 
    useCallback 은 인스턴스가 삭제되고 새로 생성되는것을 막는만큼, 그 안의 함수는 업데이트된 state 등을 최신으로 유지할 수 없다. 
    때문에 의존성으로 묶어 useCallback이 인스턴스의 값을 직접 업데이트 하는 것.()
    */
    []
  );

  return (
    <>
      <Modal
        /*  ref={modal} */
        open={modalIsOpen}
        onClose={handleStopRemovePlace}
      >
        {/* 타이머를 안에 심어놨을 때 가장 확실하게 제어하는 방법은 컴포넌트를 지웠다 생성하는것이다. */}
        {modalIsOpen && (
          <DeleteConfirmation
            onCancel={handleStopRemovePlace}
            onConfirm={handleRemovePlace}
          />
        )}
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={"Select the places you would like to visit below."}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={availablePlace}
          fallbackText={"사용자 위치를 기반으로 장소를 정렬하고 있어요"}
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
