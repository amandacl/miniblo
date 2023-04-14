import { Text, FormControl, Center, FormLabel, FormErrorMessage, FormHelperText, Input, Flex, HStack, Heading, Box, Button, Radio, RadioGroup } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useAuthentication } from '../hooks/useAuthentication'


const Login = () => {

    const [input, setInput] = useState('a')
    const [error, setError] = useState("")

    const isError = input === ''

    const initialValues = { email: "", password: "" }
    const [dataRegister, setDataRegister] = useState(initialValues)

    const { login, error: authError, loading } = useAuthentication();

    const handleInputChange = (e) => {
        setInput(e.target.value)
        setDataRegister((prevValue => ({ ...prevValue, [e.target.name]: e.target.value })))
    }

    const handleChange = (e) => {
        setDataRegister((prevValue => ({ ...prevValue, [e.target.name]: e.target.value })))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError("")

        const res = await login(dataRegister)
        console.log(res)
    }

    useEffect(() => {
        if (authError) {
            setError(authError)
        }
    })


    return (
        <Flex w="full" align="center" justify="center" m='3' bgColor='#F8F8FF'>
            <Box p={2} m={2}>
                <Box align="center">
                    <Heading fontSize='22px'>Entrar</Heading>
                    <Text mt='3'>Faça o login para acessar seu blog</Text>
                </Box>
                <Box my={4} align="left">
                    <form onSubmit={handleSubmit}>

                        <FormControl isInvalid={isError} isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input type="email"
                                required
                                placeholder="test@test.com"
                                name='email'
                                value={dataRegister.email}
                                onChange={(e) => handleInputChange(e)} />
                            {!isError ? (
                                <FormHelperText>
                                    Digite seu email para realizar o login
                                </FormHelperText>
                            ) : (
                                <FormErrorMessage>Email é necessário</FormErrorMessage>
                            )}

                        </FormControl>

                        <FormControl mt={6} isRequired>
                            <FormLabel>Senha</FormLabel>
                            <Input type="password"
                                required
                                placeholder="*******"
                                value={dataRegister.password}
                                name='password'
                                onChange={(e) => handleChange(e)} />
                        </FormControl>

                        {!loading && <Center><Button mt={4} color='white' bgColor='green' _hover={{ bgColor: 'green.300' }} type="submit">Login</Button></Center>}
                        {loading && (
                            <Button disabled mt={4} bgColor='green' color='white' _hover={{ bgColor: 'green.300' }}>Aguarde...</Button>
                        )}
                        {error ? <Text color='red'>{error}</Text> : <></>}
                    </form>
                </Box>
            </Box>
        </Flex>
    );
}


export default Login