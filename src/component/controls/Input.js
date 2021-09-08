import { TextField } from '@mui/material';

export default function Input({ name, variant, type, label, value, helperText, error=null, onChange, ...other }) {

    return (
        <TextField
            variant={variant ? variant : "standard"}
            type={type}
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            helperText={helperText}
            {...other}
            {...(error && {error:true, helperText:error})}
        />
    )
}