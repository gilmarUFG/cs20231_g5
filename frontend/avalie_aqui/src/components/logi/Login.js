import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { TextField, Button } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { useStyles } from './styles';

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

function Login() {
  const { register, handleSubmit, errors, onSubmit } = useValidation();
  const classes = useStyles();
  
  return (
        <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.formContent}>
      <TextField
        id="email"
        name="email"
        label="E-mail"
        variant="outlined"
        InputProps={{
          className: classes.textField,
        }}
        {...register('email')}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <TextField
        id="password"
        name="password"
        label="Senha"
        type="password"
        variant="outlined"
        InputProps={{
          className: classes.textField,
        }}
       
        {...register('password')}
        error={!!errors.password}
        helperText={errors.password?.message}
      />
      <Button variant="contained" color="primary" className={classes.button} type="submit">
        Entrar
      </Button>
      </div>
    </form>

   
  
  );
}

export default Login;