import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { Link } from "react-router";

export default function Footer() {
    
    return (
        <div>
            <footer className="footer footer-horizontal footer-center bg-base-200 text-base-content rounded p-10">
                <nav className="grid grid-flow-col gap-4">
                    <Link to='/'>Home</Link>
                    <Link to='create-book'>Add Books</Link>
                    <Link to='books'>All Books</Link>
                </nav>
                <nav>
                    <div className="grid grid-flow-col gap-4">
                        <a target="blank" href="https://www.linkedin.com/in/tohahossain">
                            <FaLinkedin className="text-3xl"/>
                        </a>
                        <a target="blank" href="https://github.com/tohahpro">
                            <FaGithub className="text-3xl" />
                        </a>
                    </div>
                </nav>
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by Library Management System</p>
                </aside>
            </footer>
        </div>
    );
}