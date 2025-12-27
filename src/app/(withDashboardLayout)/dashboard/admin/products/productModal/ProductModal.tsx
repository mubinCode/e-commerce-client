import RUForm from "@/components/ReUsableForms/RUForm";
import RUInput from "@/components/ReUsableForms/RUInput";
import RUFullScreenModal from "@/components/shared/Modal/RUFullScreenModal";
import { useCreateProductMutation } from "@/redux/api/productApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid } from "@mui/material";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const validationSchema = z.object({
  name: z.string("Give a valid product name"),
  slug: z.string("Give a valid product slug"),
  description: z.string("Give a product description"),
  basePrice: z.coerce.number("Give a valid number").nonnegative(),
  costPrice: z.coerce.number("Give number only").nonnegative().optional(),
  weight: z.coerce.number("Give number only").nonnegative().optional(),
  vendorId: z.string("Give product vendor id"),
  brandId: z.string("Give product brand id"),
});

const ProductModal = ({ open, setOpen }: TProps) => {
  const [createProduct]= useCreateProductMutation();
  const handleFormSubmit = async (values: FieldValues) => {
    try {
      const res = await createProduct(values).unwrap();
      if(res?.id){
        toast.success("Product created successfully!!!")
        setOpen(false)
      }
    } catch (error) {
      if(error instanceof Error){
        console.error(error.message);
      }
    }
  };
  return (
    <RUFullScreenModal open={open} setOpen={setOpen} title="Create Product">
      <RUForm onSubmit={handleFormSubmit} resolver={zodResolver(validationSchema)}>
        <Grid container spacing={2} m={2}>
          <Grid size={{ md: 4, xs: 12, sm: 12 }}>
            <RUInput name="name" label="Product Name" fullWidth={true} />
          </Grid>
          <Grid size={{ md: 4, xs: 12, sm: 12 }}>
            <RUInput name="slug" label="Product Slug" fullWidth={true} />
          </Grid>
          <Grid size={{ md: 4, xs: 12, sm: 12 }}>
            <RUInput name="description" label="Product Description" fullWidth={true} />
          </Grid>
          <Grid size={{ md: 4, xs: 12, sm: 12 }}>
            <RUInput name="basePrice" label="Product Price" fullWidth={true} />
          </Grid>
          <Grid size={{ md: 4, xs: 12, sm: 12 }}>
            <RUInput name="costPrice" label="Product Cost" fullWidth={true} />
          </Grid>
          <Grid size={{ md: 4, xs: 12, sm: 12 }}>
            <RUInput name="weight" label="Product Weight" fullWidth={true} />
          </Grid>
          <Grid size={{ md: 4, xs: 12, sm: 12 }}>
            <RUInput name="sku" label="Product SKU" fullWidth={true} />
          </Grid>
          <Grid size={{ md: 4, xs: 12, sm: 12 }}>
            <RUInput name="vendorId" label="Product Vendor" fullWidth={true} />
          </Grid>
          <Grid size={{ md: 4, xs: 12, sm: 12 }}>
            <RUInput name="brandId" label="Product Brand" fullWidth={true} />
          </Grid>
        </Grid>
        <Grid container justifyContent="flex-end">
          <Button
            sx={{
              margin: "10px 0px",
            }}
            type="submit"
          >
            Submit
          </Button>
        </Grid>
      </RUForm>
    </RUFullScreenModal>
  );
};

export default ProductModal;
