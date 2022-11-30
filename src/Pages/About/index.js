import styles from './About.module.css' 
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div className='styles.about'>
      <h2>Sobre o Magalhaes <span>Blog</span></h2>
      <p>
        Quick Application made for study purposes with React.js on the frontend and Firebase on the backend.
        </p>
        <Link to="/posts/create" className="btn">
          Create Post
        </Link>
    </div>
  )
}

export default About