import { FormControl, Center, FormLabel, FormErrorMessage, FormHelperText, Input, Flex, HStack, Heading, Box, Button, Radio, RadioGroup } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useAuthentication } from '../hooks/useAuthentication'

const Register = () => {

    const [input, setInput] = useState('a')
    const [error, setError] = useState("")

    const isError = input === ''

    const initialValues = { name: "", email: "", password: "", sexo: "" }
    const [dataRegister, setDataRegister] = useState(initialValues)
    const [confirmPassword, setConfirmPassword] = useState('')

    const {createUser, error:authError, loading} = useAuthentication();

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

        if (dataRegister.password != confirmPassword) {
            setError("As senhas precisam ser iguais!")
            return
        }

        const res = await createUser(dataRegister)
        console.log(res)
    }

    useEffect(()=>{
        if(authError){
            setError(authError)
        }
    })

    const handleSexoRadio = (e) => {
        setDataRegister((prevValue => ({ ...prevValue, [e.target.name]: e.target.value })))
    }


    return (
        <Flex w="full" align="center" justify="center" m='3'bgColor='#F8F8FF'>
            <Box p={2} m={2}>
                <Box align="center">
                    <Heading>Cadastre-se</Heading>
                </Box>
                <Box my={4} align="left">
                    <form onSubmit={handleSubmit}>
                        <FormControl isRequired>
                            <FormLabel>Nome</FormLabel>
                            <Input type="text"
                                required
                                placeholder="Digite seu nome"
                                name="name"
                                value={dataRegister.name}
                                onChange={(e) => handleChange(e)} />
                        </FormControl>

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
                                    Digite seu email para realizar o cadastro
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
                        <FormControl mt={6} isRequired>
                            <FormLabel>Confirme sua Senha</FormLabel>
                            <Input type="password"
                                required
                                placeholder="*******"
                                value={confirmPassword}
                                name='confirmPassword'
                                onChange={(e) => setConfirmPassword(e.target.value)} />
                        </FormControl>

                        <FormControl as='fieldset' isRequired>
                            <FormLabel as='legend'>Gênero</FormLabel>
                            <RadioGroup defaultValue='' name='sexo' required >
                                <HStack spacing='24px'>
                                    <Radio value='masculino' onChange={(e) => handleSexoRadio(e)}>Masculino</Radio>
                                    <Radio value='feminino' onChange={(e) => handleSexoRadio(e)}>Feminino</Radio>
                                    <Radio value='sg' onChange={(e) => handleSexoRadio(e)}>Prefiro não informar</Radio>
                                </HStack>
                            </RadioGroup>

                        </FormControl>
                        {!loading && <Center><Button mt={4} color='white'bgColor='green' _hover={{bgColor:'green.300'}} type="submit">Cadastre-se</Button></Center>}
                        {loading &&(
                            <Button disabled mt={4} bgColor='green' color='white' _hover={{bgColor:'green.300'}}>Aguarde...</Button>
                        )}
                        {error ? <p>{error}</p> : <></>}
                    </form>
                </Box>
            </Box>
        </Flex>
    );
}


export default Register