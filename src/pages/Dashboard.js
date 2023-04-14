import {Box, Button, Center, Flex, Heading, Text} from '@chakra-ui/react'
import {Link} from "react-router-dom"
import {useAuthValue} from "../context/AuthContext"
import {useFetchDocuments} from "../hooks/useFetchDocuments"
import { useDeleteDocument } from '../hooks/useDeleteDocument'

const Dashboard = () =>{
    const {user} = useAuthValue()
    const uid = user.uid
    const {deleteDocument} = useDeleteDocument("posts")
    const {documents:posts, loading} = useFetchDocuments("posts",null,uid)
    
    return(
        <Center>
        <Box>
            <Heading fontSize='2em' m='2'>Gerencie os seus posts</Heading>
            {posts && posts.length === 0?(
                <Box>
                    <Text>Não foram encontrados posts</Text>
                    <Link to='/posts/create'><Button bgColor='green.400'  border='2px' borderColor='black'>Criar o primeiro Post</Button></Link>
                </Box>
            ):(
                <Flex justify='space-between' fontWeight='bold' borderBottom='1px' mt='4'mb='4' p='10px'>
                    <Text>Título</Text>
                    <Text>Ações</Text>
                </Flex>
            )}
            {posts && posts.map((post)=>(
                <Flex key={post.id} gap='5'>
                <Text>{post.title}</Text>
                <Flex gap='2' mb='4'>
                    <Link to={`/posts/${post.id}`}><Button fontSize='14px' h='30px' w='80px' border='1px' bgColor='transparent' _hover={{bgColor:'green',color:'white'}} borderRadius='0'>Ver</Button></Link>
                    <Link to={`/posts/edit/${post.id}`}><Button border='1px' fontSize='14px' h='30px' w='80px'_hover={{bgColor:'green',color:'white'}} bgColor='transparent' borderRadius='0'>Editar</Button></Link>
                    <Button border='1px' bgColor='transparent' fontSize='14px' h='30px' w='80px'onClick={()=>deleteDocument(post.id)} _hover={{bgColor:'red', color:'white'}} borderRadius='0'>Excluir</Button>
                </Flex>
                </Flex>
            ))}
        </Box>
        </Center>
    )
}

export default Dashboard