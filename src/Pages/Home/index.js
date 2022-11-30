import styles from './Home.module.css' 
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useFetchDocuments } from '../../Hooks/useFetchDocuments'
import PostDetail from '../../Components/PostDetail'

const Home = () => {
  const [query, setQuery] = useState("")
  const {documents: posts, loading} = useFetchDocuments("posts");

  const navigate = useNavigate()

  const handleSubmit =(e)=> {
    e.preventDefault()

    if(query){
      return navigate(`/search?q=${query}`);
    }
  }

  return (
    <div className={styles.home}>
      <h1>Our most recent posts </h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input
          type="text" 
          placeholder='Search...' 
          onChange={(e)=> setQuery(e.target.value)} 
        />
        <button className='butn btn-dark'>Search</button>
      </form>
      <div>
        {loading && <p>Loading...</p>}
        {posts && posts.map((post) =>(
          <PostDetail key={post.id} post={post} />
        ))}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>No posts found</p>
            <Link to="/posts/create" className='btn'>
              Create first post !
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home