import BgWrapper from './components/core/wrapper/bgWrapper';
import { AuthProvider } from './context/authProvider';
import RouteHandler from './routes';

function App() {
  return (
    <AuthProvider>
      <BgWrapper>
        <RouteHandler/>
      </BgWrapper>
    </AuthProvider>
  );
}

export default App;
