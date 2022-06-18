import { HashRouter as Router, Route } from 'react-router-dom'
import SideBar from './components/SideBar';
import HomeScreen from './screens/HomeScreen';
import { Container } from 'react-bootstrap'
import Header from './components/Header';

function App() {
  return (
    <Router>
      <Container fluid className="main p-0 d-flex flex-row">
        <SideBar />

        <Container fluid className='p-0 content'>
          <Header />
          <Route path={'/'} component={HomeScreen} />
        </Container>
      </Container>
    </Router>
  );
}

export default App;
