import { useRef, useState, useEffect } from "react";

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

  function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    setModalIsOpen(false);

    const storedIds = JSON.parse(localStorage.getItem("selectedPlaces")) || [];
    localStorage.setItem(
      "selectedPlaces",
      JSON.stringify(storedIds.filter((x) => x !== selectedPlace.current))
    );
  }

  return (
    <>
      <Modal /*  ref={modal} */ open={modalIsOpen}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
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
