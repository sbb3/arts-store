"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { productSchema } from "@/services/validation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUploadThing } from "@/services/uploadthing";
import { FileUploader } from "@/components/file-uploader";
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import {
  CREATE_PRODUCT_MUTATION,
  UPDATE_PRODUCT_MUTATION,
} from "@/lib/apollo/mutations";
import Error from "../error";

export default function ProductFormModal({
  isOpen,
  onOpenChange,
  setProducts,
  setTotalProducts,
  product,
  setEditProduct,
}) {
  const [imageUrlState, setImageUrlState] = useState("");

  const [isUplloading, setIsUploading] = useState(false);
  const { toast } = useToast();
  const [files, setFiles] = useState([]);

  const { startUpload } = useUploadThing("imageUploader");

  const [
    createProduct,
    { loading: createMutationLoading, error: createMutationError },
  ] = useMutation(CREATE_PRODUCT_MUTATION);

  const [
    updateProduct,
    { loading: updateMutationLoading, error: updateMutationError },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);

  const form = useForm({
    resolver: zodResolver(
      productSchema.pick({
        name: true,
        description: true,
        price: true,
      })
    ),
    defaultValues: {
      name: product ? product.name : "",
      description: product ? product.description : "",
      price: product ? product.price : 10,
      imageUrl: product ? product.image : "",
    },
  });

  useEffect(() => {
    if (!isOpen) {
      form.reset();
      setEditProduct(null);
    }

    if (product && isOpen) {
      console.log("product", product);
      form.setValue("name", product.name);
      form.setValue("description", product.description);
      form.setValue("price", product.price);
      form.setValue("imageUrl", product.image);
      setImageUrlState(product.image);
    }
  }, [isOpen]);

  const handleOnCreateProduct = async (data) => {
    try {
      let uploadedImageUrl = "";
      if (files.length > 0) {
        setIsUploading(true);
        const uploadedImages = await startUpload(files);
        setIsUploading(false);

        if (!uploadedImages) {
          toast({
            title: "Error",
            description: "Failed to upload image",
          });
          return;
        }

        uploadedImageUrl = uploadedImages[0].url;
      }
      const { name, description, price } = data;
      let result;
      if (product) {
        result = await updateProduct({
          variables: {
            id: product.id,
            name,
            description,
            price: parseFloat(price),
            image: uploadedImageUrl || product.image,
          },
        });

        setProducts((prev) =>
          prev.map((p) => {
            if (p.id === product.id) {
              return result.data.update_products_by_pk;
            }
            return p;
          })
        );
        setEditProduct(null);
      } else {
        result = await createProduct({
          variables: {
            name,
            description,
            price: parseFloat(price),
            image: uploadedImageUrl || "https://picsum.photos/200/300",
          },
        });

        setProducts((prev) => [result.data.insert_products_one, ...prev]);
        setTotalProducts((prev) => prev + 1);
      }

      toast({
        title: "Success",
        description: `Product ${product ? "updated" : "created"} successfully`,
      });
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: error?.message || "Failed to create product",
        status: "error",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <Form {...form}>
          <form
            className="flex flex-col gap-5 p-4"
            onSubmit={form.handleSubmit(handleOnCreateProduct)}
          >
            <div className="flex flex-col gap-5 w-full pb-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Price"
                        {...field}
                        type="number"
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(parseFloat(value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="imageUrl"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Image</FormLabel>
                    <FormControl className="h-72 border border-gray-300 rounded-lg">
                      <FileUploader
                        onFieldChange={(value) => {
                          form.setValue("imageUrl", value);
                          setImageUrlState(value);
                        }}
                        imageUrl={imageUrlState}
                        setFiles={setFiles}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end gap-4">
              <Button
                type="submit"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={
                  form.formState.isSubmitting ||
                  createMutationLoading ||
                  updateMutationLoading ||
                  isUplloading
                }
              >
                {product ? "Update" : "Create"}
              </Button>
            </div>
          </form>
        </Form>
        {createMutationError && <Error error={createMutationError} />}
        {updateMutationError && <Error error={updateMutationError} />}
      </DialogContent>
    </Dialog>
  );
}
