import './App.css';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Home from './views/Home';
import Navbar from './components/Navbar';
import ErrorPage from './views/ErrorPage';
import NotFound from './views/NotFound';
import Signup from './views/auth/Signup';
import Login from './views/auth/Login';
import PrivateView from './views/PrivateView';
import IsPrivate from './components/IsPrivate';
import LineUpDetails from './views/lineups/LineUpDetails';
import LineUpEdit from './views/lineups/LineUpEdit';
import NewLineUp from './views/lineups/NewLineUp';
import ProfileView from './views/profile/ProfileView';
import ProfileLikedView from './views/profile/ProfileLikedView';
import ProfileEdit from './views/profile/ProfileEdit';
import ProfileUser from './views/profile/ProfileUser';
import TrackerView from './views/TrackerView';

function App() {
  return (
    <div className="App">
      <Toaster/>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/lineup/:lineupId" element={<LineUpDetails />} />
        <Route path="/lineup/:lineupId/edit" element={<LineUpEdit />} />
        <Route path="/lineup/create" element={<NewLineUp />} />
        <Route path="/profile" element={<ProfileView />} />
        <Route path="/profile/liked" element={<ProfileLikedView />} />
        <Route path="/profile/edit" element={<ProfileEdit />} />
        <Route path="/profile/:userId" element={<ProfileUser />} />
        <Route path="/tracker" element={<TrackerView />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/private" element={<IsPrivate><PrivateView /></IsPrivate>} />
        <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
