import { Outlet } from 'react-router-dom';

const PublicLayout = () => {
  return (
    <div>
      {/* Podemos adicionar Navbar/Footer aqui depois, se necessário */}
      <Outlet />
    </div>
  );
};

export default PublicLayout;