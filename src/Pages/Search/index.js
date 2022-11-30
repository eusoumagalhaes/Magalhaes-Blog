import styles from './Search.module.css'

import { useFetchDocuments } from '../../Hooks/useFetchDocuments'
import { useQuery } from '../../Hooks/useQuery'

import PostDetail from '../../Components/PostDetail'
import { Link } from 'react-router-dom'

const Search = () => {
    const query = useQuery()
    const search = query.get('q')

    const {documents: posts} = useFetchDocuments("posts", search)

  return (
    <div>
        <h2>Search</h2>
        <div>
            {posts && posts.length === 0 && (
                <div className='styles.noposts'>
                  <p>No posts were found for your search.</p>
                </div>
            )}
            {posts && posts.map((post) =>(
                <PostDetail key={post.id} post={post} />
            ))}
        </div>
    </div>
  )
}

export default Search