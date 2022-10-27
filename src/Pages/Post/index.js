import styles from './Post.module.css'

import { useParams } from 'react-router-dom'
import { useFetchDocument } from '../../Hooks/useFetchDocument'

const Post = () => {
    const { id } = useParams()
    const {document: post, loading} = useFetchDocument('posts', id)

  return (
    <div className={styles.post_container}>
        {loading && <p>Carregando post...</p>}
        {post && (
            <>
                <h1>{post.title}</h1>
                <img src={post.image} alt={post.title}/>
                <p>{post.body}</p>
                <div className='styles.tags'>
                <h3>Este post é sobre :</h3>
                {post.tagsArray.map((tag) => (
                    <p key={tag} className={styles.tag}><span>#</span>{tag}</p>
                ))}
                </div>
            </>
        )}
    </div>
  )
}

export default Post