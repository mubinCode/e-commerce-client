import RUFileUploader from "@/components/ReUsableForms/RUFileUploader";
import RUForm from "@/components/ReUsableForms/RUForm";
import RUInput from "@/components/ReUsableForms/RUInput";
import RUModal from "@/components/shared/Modal/RUModal";
import { useCreateBrandMutation } from "@/redux/api/brandApi";
import { Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const BrandModal = ({ open, setOpen }: TProps) => {
    const [createBrand] = useCreateBrandMutation();
  const handleFormSubmit = async (values: FieldValues) => {
    try {
        const res = await createBrand(values).unwrap();
        if (res?.id) {
            toast.success("Brand created successfully.");
            setOpen(false);
          }
    } catch (error) {
        if(error instanceof Error){
            console.error(error.message);
        }
    }
  };
  return (
    <RUModal open={open} setOpen={setOpen} title="Create Product">
      <RUForm onSubmit={handleFormSubmit}>
        <Grid container spacing={2}>
          <Grid size={{ md: 6 }}>
            <RUInput name="name" label="Brand Name" />
          </Grid>
          <Grid size={{ md: 6 }} container justifyContent="end">
            <RUInput name="logoUrl" label="Brand Url" />
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end">
          <Button sx={{ margin: "10px 0px" }} type="submit">
            Submit
          </Button>
        </Grid>
      </RUForm>
    </RUModal>
  );
};

export default BrandModal;
