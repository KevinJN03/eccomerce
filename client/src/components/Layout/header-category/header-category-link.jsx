function Header_link({ text, link }) {
    return (
        <a className="header-link text-s tracking-wider" href={link}>
            {text}
        </a>
    );
}

export default Header_link;
