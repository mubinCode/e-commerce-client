import RUModal from "@/components/shared/Modal/RUModal";
import RUForm from "@/components/ReUsableForms/RUForm";
import RUInput from "@/components/ReUsableForms/RUInput";
import { Button, Grid } from "@mui/material";
import React from "react";
import { FieldValues } from "react-hook-form";
import RUFileUploader from "@/components/ReUsableForms/RUFileUploader";
import { modifyPayload } from "@/utils/modifyPayload";
import { useCreateCategoryMutation } from "@/redux/api/categoryApi";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

type TProps = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const validationSchema = z.object({
  name: z.string("Give a valid category name"),
  slug: z.string("Give a valid category slug"),
  description: z.string().min(2, "Give your category description").optional(),
  parentSlug: z.string().min(2, "Parent slug").optional(),
  file: z.instanceof(File, { message: "File is required" })
});

const CategoryModal = ({ open, setOpen }: TProps) => {
  const [createCategory] = useCreateCategoryMutation();

  const handleFormSubmit = async (values: FieldValues) => {
    const data = modifyPayload(values);
    try {
      const res = await createCategory(data).unwrap();
      if (res?.id) {
        toast.success("Category created successfully.");
        setOpen(false);
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <RUModal open={open} setOpen={setOpen} title="Create Category">
      <RUForm
        onSubmit={handleFormSubmit}
        resolver={zodResolver(validationSchema)}
      >
        <Grid container spacing={2}>
          <Grid size={{ md: 6 }}>
            <RUInput name="name" label="Name" fullWidth={true} />
          </Grid>
          <Grid size={{ md: 6 }}>
            <RUInput name="slug" label="Slug" fullWidth={true} />
          </Grid>
          <Grid size={{ md: 12 }}>
            <RUInput name="description" label="Description" fullWidth={true} />
          </Grid>
          <Grid size={{ md: 6 }}>
            <RUInput name="parentSlug" label="parent" fullWidth={true} />
          </Grid>
          <Grid size={{ md: 6 }} container justifyContent="end">
            <RUFileUploader name="file" label="upload file" />
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
    </RUModal>
  );
};

export default CategoryModal;
