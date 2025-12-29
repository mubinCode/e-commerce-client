"use client";

import { Box, Button, IconButton, Stack, TextField } from "@mui/material";
import CategoryModal from "./categoryModal/CategoryModal";
import { useState } from "react";
import { useDeleteCategoryMutation, useGetAllCategoriesQuery } from "@/redux/api/categoryApi";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Image from "next/image";
import DeleteIcon from '@mui/icons-material/Delete';
import { toast } from "sonner";

const Categorypage = () => {
  const [isModalOpen, setModalOpen] = useState<boolean>(false);
  const { data, isLoading } = useGetAllCategoriesQuery({});
  const [deleteCategory] = useDeleteCategoryMutation();
  const handleDelete = async (id: string) => {
    try {
        const res = await deleteCategory(id).unwrap();
        if(res?.id){
            toast.success("Category deleted successfully.");
        }
    } catch (error) {
        if(error instanceof Error){
        console.error(error.message)}
    }
  }

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', flex: 1},
    { field: 'slug', headerName: 'Slug', flex: 1 },
    { field: 'image', headerName: 'Icon', flex: 1, headerAlign: "center", align: "center", renderCell: ({row})=> {return <Box sx={{display: "flex", justifyContent: "center"}}>
        <Image src={row.image} alt="row icon" width={80} height={80} />
    </Box>}, },
    { field: 'action', headerName: 'Action', flex: 1, headerAlign: "center", align: "center", renderCell: ({row})=> {return <IconButton onClick={() => handleDelete(row.id)} aria-label="delete">
        <DeleteIcon />
      </IconButton> }},
  ];
  return (
    <Box>
      <Stack
        direction="row"
        justifyContent="space-between"
        justifyItems="center"
      >
        <Button onClick={() => setModalOpen(true)}>Create Category</Button>
        <CategoryModal open={isModalOpen} setOpen={setModalOpen} />
        <TextField size="small" placeholder="Search Category" />
      </Stack>
      {
        !isLoading ? <Box my={2}>
        <DataGrid
          rows={data?.data}
          columns={columns}
        />
      </Box> :
      <h1>Loading data.....</h1>
      }
    </Box>
  );
};

export default Categorypage;
