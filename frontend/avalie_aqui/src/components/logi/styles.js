import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  form: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '500px',
    margin: '0 auto',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D3D3D3',
    border: '1px solid rgba(0, 0, 0, 0.2)',
    boxShadow: '2px 2px 5px rgba(0, 0, 0, 0.2)',    
    borderRadius: 5,
    marginTop: 20,
    height: '40vh',
  },
  formContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    width: '100%',
    maxWidth: '600px',
  },
  textField: {
    margin: '0.5rem',
    width: '200%',
    maxWidth: '400px',
    marginBottom: '1rem',
  },
  button: {
    margin: '1rem',
    width: '200%',
    maxWidth: '400px',
    marginBottom: '1rem',
  },
}));
