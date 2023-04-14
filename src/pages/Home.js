import { useNavigate, Link } from "react-router-dom"
import { useState } from "react"
import { Heading, Text, Flex, Button, Input, FormControl } from "@chakra-ui/react"
import { useFetchDocuments } from "../hooks/useFetchDocuments"
import PostDetails from '../components/PostDetails'

const Home = ()=>{
    const [query, setQuery] = useState("")
    const {documents:posts, loading} = useFetchDocuments("posts")
    const navigate = useNavigate()

    const handleSubmit = (e) =>{
        e.preventDefault()
        if(query){
            return navigate(`/search?q=${query}`)
        }
    }

    return(
        <Flex direction='column' justify='center' align='center' m='3'>
            <Heading fontSize='22px' m='3'>Veja os posts mais recentes</Heading>
            <form onSubmit={handleSubmit}>
                <FormControl w='full' m='3'>
                <Input 
                    type='text'
                    placeholder='Ou busque por tags...'
                    onChange={(e)=> setQuery(e.target.value)}/>
                    </FormControl>
                <Button type='submit'display='inline-block'>Pesquisar</Button>
            </form>
            <Flex m='3' justify='center' direction='column' align='center'>
                {loading && <Text>Carregando...</Text>}
                {posts && posts.map((post)=><PostDetails key={post.id} post={post}/> )}
                {posts && posts.length === 0 &&(
                    <Flex>
                        <Text>Não foram encontrados posts</Text>
                        <Link to='/posts/create'>Criar um post</Link>
                    </Flex>
                )}
            </Flex>
        </Flex>
    )
}

export default Home