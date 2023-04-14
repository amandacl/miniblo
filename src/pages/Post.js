import { useParams } from "react-router-dom"
import { useFetchDocument } from "../hooks/useFetchDocument"
import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react"

const Post = () => {
    const { id } = useParams()
    const { document: post, loading } = useFetchDocument("posts", id)
    return (
        <Flex direction='column' align='center' justify='center' m='5'>
            {loading && <p>carregando post...</p>}
            {post && (
                <Flex direction='column'>
                    <Heading m='3'>{post.title}</Heading>
                    <Image src={post.image} alt={post.title} w='600px' m='3'/>
                    <Text m='3'>{post.body}</Text>
                    <Text m='2'>Este post trata sobre</Text>
                    <Flex gap='3'>                        
                        {post.tags.map((tag) => (
                            <p key={tag}>#{tag}</p>
                        ))}
                    </Flex>
                </Flex>
            )}

        </Flex>
    )
}

export default Post