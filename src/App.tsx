import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useReadLocalStorage } from "usehooks-ts";
import { EstimateRoom } from "./EstimateRoom";
import { Index } from "./Index";
import { Room } from "./Room";
import { ScoreRoom } from "./ScoreRoom";
import { UserNameForm } from "./UserNameForm";

function App() {
  const userName = useReadLocalStorage<string | undefined>("userName");

  if (userName == null) {
    return <UserNameForm />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/room" element={<Room />}>
          <Route path="score/:roomId" element={<ScoreRoom />} />
          <Route path="estimate/:roomId" element={<EstimateRoom />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
