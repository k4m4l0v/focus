import { Logo } from './Logo';
import '../styles/header.css';

export const Header = () => {
    return (
        <header className="main-header">
            <Logo width={66} height={85} />
        </header>
    )
}