import { Scroll, Timer } from 'phosphor-react';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/Logo.svg';
import { HeaderContainer } from './styles';

export default function Header() {
  return (
    <HeaderContainer>
      <span>
        <img src={Logo} alt="" />
      </span>
      <nav>
        <NavLink to="/" title="Timer">
          <Timer size={24} />
        </NavLink>
        <NavLink to="/history" title="Histórico">
          <Scroll size={24} />
        </NavLink>
      </nav>
    </HeaderContainer>
  );
}
