import { Link } from "react-router-dom"
import PostDetail from "../components/PostDetails"
import { useFetchDocuments } from "../hooks/useFetchDocuments"
import { useQuery } from "../hooks/useQuery"

const Search = () =>{
    const query = useQuery()
    const search = query.get("q")

    const {documents:posts} = useFetchDocuments("posts", search)
    return(
        <div>
            <h2>{search}</h2>
            <div>
                {posts && posts.length === 0 &&(
                    <>
                    <p>Não foram encontrados posts</p>
                    <Link to="/">Voltar</Link>
                    </>
                )}
                {posts && posts.map((post)=>(
                    <PostDetail key={post.id} post={post}/>
                ))}
            </div>
        </div>
    )
}

export default Search