import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { TextField, Button } from '@material-ui/core';

const schema = z.object({
    email: z.string().email('E-mail inválido').nonempty('Campo obrigatório'),
    password: z.string().min(8, 'Senha deve conter no mínimo 8 caracteres').nonempty('Campo obrigatório'),
  });

  const useValidation = () => {
    const { register, handleSubmit, formState: { errors } } = useForm({
      resolver: zodResolver(schema),
      mode: 'onBlur',
      defaultValues: {
        email: '',
        password: '',
      },
    });
  
    const onSubmit = (data) => {
      console.log(data);
    };
  
    return { register, handleSubmit, errors, onSubmit };
  };

  const Login = () => {
    const { register, handleSubmit, errors, onSubmit } = useValidation();
  
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          id="email"
          label="E-mail"
          variant="outlined"
          fullWidth
          {...register('email')}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          id="password"
          label="Senha"
          type="password"
          variant="outlined"
          fullWidth
          {...register('password')}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button variant="contained" color="primary" type="submit">
          Entrar
        </Button>
      </form>
    );
  };

  export default Login;
