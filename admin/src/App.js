import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Dashboard from "./pages/dashboard/dashboard";
import Users from "./pages/users/users";
import AdminLogin from "./pages/adminLogin/adminLogin";
import HotelsList from "./pages/hotelsList/hotelsList";
import AddHotel from "./pages/addHotel/addHotel";
import RoomsList from "./pages/roomsList/rooomsList";
import AddRoom from "./pages/addRoom/addRoom";
import Transactions from "./pages/transactions/transactions";
import EditHotel from "./pages/editHotel/editHotel";
import EditRoom from "./pages/editRoom/editRoom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/hotels" element={<HotelsList />} />
        <Route path="/add-hotel" element={<AddHotel />} />
        <Route path="/rooms" element={<RoomsList />} />
        <Route path="/add-room" element={<AddRoom />} />
        <Route path="/transactions" element={<Transactions />} />
        <Route path="/edit-hotel/:hotelId" element={<EditHotel />} />
        <Route path="/edit-room/:roomId" element={<EditRoom />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
