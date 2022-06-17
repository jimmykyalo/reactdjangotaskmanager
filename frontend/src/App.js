import { HashRouter as Router, Route } from 'react-router-dom'
import SideBar from './components/SideBar';
import HomeScreen from './screens/HomeScreen';
import { Container } from 'react-bootstrap'

function App() {
  return (
    <Router>
      <Container fluid className="main p-0 d-flex flex-row">
        <SideBar />
        <Route path={'/'} component={HomeScreen} />
      </Container>
    </Router>
  );
}

export default App;
