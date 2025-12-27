import { SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  name: string;
  label?: string;
  type?: string;
  size?: "small" | "medium";
  fullWidth?: boolean;
  placeholder?: string;
  sx?: SxProps;
  required?: boolean;
};
const RUInput = ({
  name,
  label,
  type = "text",
  size = "small",
  fullWidth,
  sx,
  placeholder,
  required,
}: TInputProps) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          sx={{ ...sx }}
          value={field.value ?? ""}
          label={label}
          type={type}
          variant="outlined"
          size={size}
          fullWidth={fullWidth}
          placeholder={placeholder ?? label}
          required={required}
          error={!!error?.message}
          helperText={error?.message}
        />
      )}
    />
  );
};

export default RUInput;
