import React from 'react'
import './footer.css'

const Footer: React.FC = () => {
    return (
        <div className="footer">
            <div className="footer-text">©{new Date().getFullYear()}, built by <a href="https://thepetersweeney.com">thepetersweeney.com</a></div>
        </div>
    )
}

export default Footer