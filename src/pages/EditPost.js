import { Text, FormControl, Center, FormLabel,Image, Input, Flex, Heading, Box, Button, Textarea } from '@chakra-ui/react'
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthValue } from "../context/AuthContext"
import { useUpdateDocument } from '../hooks/useUpdateDocument'
import { useFetchDocument } from '../hooks/useFetchDocument'
import { useParams } from 'react-router-dom'

const EditPost = () => {
    const { id } = useParams()
    const { document: post } = useFetchDocument("posts", id)
    const [title, setTitle] = useState("");
    const [image, setImage] = useState("");
    const [body, setBody] = useState("");
    const [tags, setTags] = useState([]);
    const [formerror, setFormError] = useState('')

    useEffect(() => {
        if (post) {
            setTitle(post.title);
            setBody(post.body);
            setImage(post.image);
            const textTags = post.tags.join(",")
            setTags(textTags)
        }
    }, [post])

    const { user } = useAuthValue()


    const { updateDocument, response } = useUpdateDocument("posts")

    const navigate = useNavigate()
    const handleSubmit = (e) => {
        e.preventDefault()
        setFormError('')

        try {
            new URL(image)
        } catch (error) {
            setFormError('A imagem precisa ser uma url')
        }

        const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase())

        if (!title || !image || !tags || !body) {
            setFormError("Por favor, preencha todos os campos!")
        }

        if (formerror) return

        updateDocument(id,{
            title,
            image,
            body,
            tags: tagsArray,
            uid: user.uid,
            createdBy: user.displayName
        })

        navigate('/dashboard')
    }

    return (

        <Flex w="full" direction='column' align="center" justify="center" m='3' bgColor='#F8F8FF'>
            {post &&(
                <>
                <Box p={2} m={2} align='center'>
                <Heading fontSize='22px' mb='3'>Editando post: {post.title}</Heading>
                <Text mb='2'>Altere os dados do ppost como desejar</Text>
            </Box>

            <Box w='lg'>
                <form onSubmit={handleSubmit}>
                    <FormControl>
                        <FormLabel>Título:</FormLabel>
                        <Input
                            type='text'
                            name='title'
                            value={title}
                            required
                            placeholder='Pense no seu título'
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Imagem:</FormLabel>
                        <Input
                            type='text'
                            name='image'
                            value={image}
                            required
                            placeholder='Insira uma imagem que representa o seu post'
                            onChange={(e) => setImage(e.target.value)}
                        />
                    </FormControl>
                    <Text>Preview da imagem atual</Text>
                    <Image src={post.image} alt={post.title}/>
                    <FormControl>
                        <FormLabel>Conteúdo:</FormLabel>
                        <Textarea
                            name='body'
                            value={body}
                            required
                            placeholder='Insira o conteúdo do post'
                            onChange={(e) => setBody(e.target.value)}
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>Tags:</FormLabel>
                        <Input
                            type='text'
                            name='tags'
                            value={tags}
                            required
                            placeholder='insira as tags separadas por vírgula'
                            onChange={(e) => setTags(e.target.value)}
                        />
                    </FormControl>

                    {!response.loading && <Center><Button mt={4} color='white' bgColor='green' _hover={{ bgColor: 'green.300' }} type="submit">Cadastrar</Button></Center>}
                    {response.loading && (
                        <Button disabled mt={4} bgColor='green' color='white' _hover={{ bgColor: 'green.300' }}>Aguarde...</Button>
                    )}
                    {response.error ? <Text color='red'>{response.error}</Text> : <></>}
                    {formerror ? <Text color='red'>{formerror}</Text> : <></>}
                </form>
            </Box>
                </>
            )}
        </Flex>

    )
}

export default EditPost

