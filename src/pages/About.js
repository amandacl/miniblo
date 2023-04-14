import {Button, Flex, Heading, Text} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

const About = () =>{
    return(
        <Flex align='center' direction='column' m='10'>
            <Heading fontSize='20px' mb='4'>Sobre o Mini Blog</Heading>
            <Text color='#aaa' mb='2em'>Este projeto consiste em um blog feito com react no front-end e firebase no back-end</Text>
            <Link mt='15px' to='/posts/create'><Button bgColor='green.500' color='white' _hover={{bgColor:'green.400'}}>Criar Post</Button></Link>
        </Flex>
    )
}

export default About