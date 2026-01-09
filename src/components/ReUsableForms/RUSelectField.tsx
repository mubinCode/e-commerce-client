import { MenuItem, SxProps, TextField } from "@mui/material";
import { Controller, useFormContext } from "react-hook-form";

export interface SelectItem {
  label: string;
  value: string | number;
}

interface ISelectField {
  name: string;
  size?: "small" | "medium";
  placeholder?: string;
  label?: string;
  required?: boolean;
  fullWidth?: boolean;
  sx?: SxProps;
  items: SelectItem[];
}
const RUSelectField = ({
  name,
  items,
  label,
  size,
  required,
  fullWidth,
  sx,
}: ISelectField) => {
  const { control, formState } = useFormContext();
  const isError = formState.errors[name] !== undefined;
  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <TextField
          {...field}
          select
          sx={{ ...sx }}
          size={size}
          label={label}
          required={required}
          fullWidth={fullWidth}
          error={isError}
          helperText={
            isError ? (formState.errors[name]?.message as string) : ""
          }
        >
          {items.map((name) => (
            <MenuItem key={name.value} value={name.value}>
              {name.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  );
};

export default RUSelectField;
