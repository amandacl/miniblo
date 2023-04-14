import { Button, Flex, Link, Text, VStack, Box } from "@chakra-ui/react"
import { Link as ReachLink } from "react-router-dom";
import { NavLink } from "react-router-dom"
import { useAuthValue } from "../context/AuthContext";
import { useAuthentication } from "../hooks/useAuthentication";


const Navbar = () => {
    const {user} = useAuthValue()
    const {logout} = useAuthentication()
    return (

        <Flex bgColor='#F8F8FF' boxShadow='lg' direction='row' align='center' justify='space-between' p='2' fontSize='1.2em'>
            <Flex direction='row'>
                <NavLink to="/">
                    Mini<Text display='contents' fontWeight='black' textTransform='uppercase'>Blog</Text>
                </NavLink>
            </Flex>

            <Flex direction='row' align='center' gap='5'>
                <Link p='2' as={ReachLink} to="/" _hover={{ bgColor: 'black', color: 'white' }}>Home</Link>
                {!user && (
                    <>
                        <Flex>
                            <Link p='2' as={ReachLink} to="/login" _hover={{ bgColor: 'black', color: 'white' }}>Login</Link>
                        </Flex>
                        <Flex>
                            <Link p='2' as={ReachLink} to="/register" _hover={{ bgColor: 'black', color: 'white' }}>Cadastro</Link>
                        </Flex>
                    </>
                )}

            {user && (
                    <>
                        <Flex>
                            <Link p='2' as={ReachLink} to="/posts/create" _hover={{ bgColor: 'black', color: 'white' }}>Posts</Link>
                        </Flex>
                        <Flex>
                            <Link p='2' as={ReachLink} to="/dashboard" _hover={{ bgColor: 'black', color: 'white' }}>Dashboard</Link>
                        </Flex>

                    </>
                )}

                <Flex>
                    <Link p='2' as={ReachLink} to="/about" _hover={{ bgColor: 'black', color: 'white' }}>Sobre</Link>
                </Flex>

                {user &&(
                    <Flex>
                        <Button p='2' bgColor='transparent' _hover={{ bgColor: 'black', color: 'white' }} onClick={logout}>Sair</Button>
                    </Flex>
                )}
            </Flex>





        </Flex>
    )
}

export default Navbar