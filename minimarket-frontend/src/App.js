import './App.css';
import Client from './components/client/Client';
import Commande from './components/commande/Commande';
import Societe from './components/societe/Societe';
import ClientForm from './components/client/ClientForm';
import Sidebar from './components/Sidebar';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Article from './components/article/Article';
import Fournisseur from './components/Fournisseur/Fournisseur';
import Livraison from './components/livraison/Livraison';

function App() {
  return (
    <Router>
      <div className="flex">
        <aside className="w-64" aria-label="Sidebar">
          <Sidebar />
        </aside>

        <Routes>
          <Route path={"/articles"} exact element={<Article />} />
          <Route path={"/clients"} exact element={<Client />} />
          <Route path="/commandes" exact element={<Commande />} />
          <Route path="/societes" exact element={<Societe />} />
          <Route path={"/fournisseurs"} exact element={<Fournisseur />} />
          <Route path={"/livraisons"} exact element={<Livraison />} />
        </Routes>
      </div >
    </Router>
  );
}

export default App;
