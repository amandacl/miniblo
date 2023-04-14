import { Box, Flex, Heading, Img, Text, VStack } from "@chakra-ui/react"
import { Link } from "react-router-dom"

const PostDetail = ({ post }) => {
    return (
        <Flex m='4'>
            <VStack spacing='6px'>
                <Img src={post.image} alt={post.title} w='600px' />

                <Heading>{post.title}</Heading>
                <Text>{post.createdBy}</Text>
                <Box>
                {post.tags && post.tags.map((tag) => (
                    <Text key={tag}>#{tag}</Text>
                ))}
                </Box>
                <Link to={`/posts/${post.id}`}>Ler</Link>
            </VStack>
        </Flex>
    )
}

export default PostDetail