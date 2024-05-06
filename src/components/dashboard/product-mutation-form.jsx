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
import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import {
  CREATE_PRODUCT_MUTATION,
  UPDATE_PRODUCT_MUTATION,
} from "@/lib/apollo/mutations";
import Error from "../error";
import Image from "next/image";
import { ClipLoader } from "react-spinners";

export default function ProductMutationForm({
  isOpen,
  onOpenChange,
  setProducts,
  setTotalProducts,
  product,
  setEditProduct,
}) {
  const { toast } = useToast();
  const [image, setImage] = useState("");
  const [isUplloading, setIsUploading] = useState(false);
  const [files, setFiles] = useState([]);

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
      setImage("");
    }

    if (product && isOpen) {
      form.setValue("name", product.name);
      form.setValue("description", product.description);
      form.setValue("price", product.price);
      form.setValue("imageUrl", product.image);
      setImage(product.image);
    }
  }, [isOpen]);
  const createProductFunc = async (data, uploadedImageUrl) => {
    const { name, description, price } = data;
    const result = await createProduct({
      variables: {
        name,
        description,
        price: parseFloat(price),
        image: uploadedImageUrl || "https://picsum.photos/200/300",
      },
    });

    setProducts((prev) => [result.data.insert_products_one, ...prev]);
    setTotalProducts((prev) => prev + 1);
    toast({
      title: "Success",
      description: "Product created successfully",
      className: "success-toast",
      duration: 5000,
    });
    onOpenChange(false);
  };

  const updateProductFunc = async (data, uploadedImageUrl) => {
    const { name, description, price } = data;
    const result = await updateProduct({
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
    toast({
      title: "Success",
      description: "Product updated successfully",

      className: "success-toast",
      duration: 5000,
    });
    onOpenChange(false);
  };

  const createOrUpdateProduct = async (data) => {
    try {
      let uploadedImageUrl = "";
      if (files.length > 0) {
        const file = files[0];

        const formData = new FormData();

        formData.append("file", file);
        formData.append("upload_preset", "art-store");
        formData.append("folder", "art-store");

        setIsUploading(true);

        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );
        setIsUploading(false);

        if (!res.ok) {
          toast({
            title: "Something went wrong while uploading image",
            description: "Please try again",
            duration: 5000,
            className: "error-toast",
          });
          return;
        }

        const result = await res.json();
        uploadedImageUrl = result.secure_url;
      }

      const isUpdate = product ? true : false;

      if (isUpdate) {
        await updateProductFunc(data, uploadedImageUrl);
      } else {
        await createProductFunc(data, uploadedImageUrl);
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again",
        duration: 5000,
        className: "error-toast",
      });
    }
  };
  return (
    <Dialog
      open={isOpen}
      onOpenChange={() => {
        onOpenChange(false);
        form.reset();
      }}
    >
      <DialogContent
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
      >
        <Form {...form}>
          <form
            className="flex flex-col gap-5 p-4"
            onSubmit={form.handleSubmit(createOrUpdateProduct)}
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
                  <FormItem className="flex size-full flex-col ">
                    <FormLabel>Image</FormLabel>
                    <FormControl className="h-72 border border-gray-300 rounded-lg ">
                      {image ? (
                        <div
                          className="cursor-pointer overflow-hidden rounded-[10px]"
                          onClick={() =>
                            document.getElementById("fileInput").click()
                          }
                        >
                          <Image
                            width={250}
                            height={250}
                            src={image}
                            alt="image"
                            sizes={"(max-width: 767px) 100vw, 50vw"}
                            className="media-uploader_cldImage"
                          />
                          <Input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            multiple={false}
                            style={{ display: "none" }}
                            onChange={(e) => {
                              setFiles(e.target.files);
                              const file = e.target.files[0];
                              const reader = new FileReader();
                              reader.onload = (e) => {
                                setImage(e.target.result);
                              };
                              reader.readAsDataURL(file);
                            }}
                          />
                        </div>
                      ) : (
                        <div
                          className="media-uploader_cta"
                          onClick={() =>
                            document.getElementById("fileInput").click()
                          }
                        >
                          <div className="media-uploader_cta-image">
                            <Image
                              src="/assets/images/icons/add.svg"
                              alt="Upload Image"
                              width={64}
                              height={64}
                            />
                          </div>
                          <p className="text-sm text-gray-500 font-medium">
                            Click here to upload image
                          </p>
                          <Input
                            id="fileInput"
                            type="file"
                            accept="image/*"
                            multiple={false}
                            style={{ display: "none" }}
                            onChange={(e) => {
                              setFiles(e.target.files);
                              const file = e.target.files[0];
                              const reader = new FileReader();
                              reader.onload = (e) => {
                                setImage(e.target.result);
                              };
                              reader.readAsDataURL(file);
                            }}
                          />
                        </div>
                      )}
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end gap-4 items-center">
              <Button
                type="submit"
                disabled={
                  form.formState.isSubmitting ||
                  createMutationLoading ||
                  updateMutationLoading ||
                  isUplloading
                }
                className="flex items-center gap-2"
              >
                {form.formState.isSubmitting ||
                createMutationLoading ||
                updateMutationLoading ||
                isUplloading ? (
                  <ClipLoader size={18} color="#fff" />
                ) : product ? (
                  "Update"
                ) : (
                  "Create"
                )}
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
