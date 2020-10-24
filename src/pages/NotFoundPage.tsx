import React from 'react'
import Footer from '../components/footer/footer'
import './NotFoundPage.css'

const NotFoundPage: React.FC = () => {
    return (
        <>
            <div className="not-found-box">
                Page Not Found - <a href="/">Go back to the Application</a>
            </div>
            <Footer />
        </>
    )
}

export default NotFoundPage