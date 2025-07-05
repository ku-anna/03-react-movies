/*export default function Timer() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    // 1. Зберігаєм ідентифікатор інтервалу в змінну
    const intervalId = setInterval(() => {
      setTime(new Date());
      console.log(`Interval - ${Date.now()}`);
    }, 1000);

    return () => {
      // 2. Видаляємо інтервал за його id
      clearInterval(intervalId);
    };
  }, []);

  return <p>TimerBox - {time.toLocaleTimeString()}</p>;
}*/
import { useState } from "react";
import Modal from "./Modal";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <h1>Main content of the page</h1>
      <button onClick={openModal}>Open modal</button>
      {isModalOpen && <Modal onClose={closeModal} />}
    </div>
  );
}
