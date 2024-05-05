"use client";

import ProductFormModal from "@/components/dashboard/create-product";
import ShowDeleteProductModal from "@/components/dashboard/delete-product";
import Table from "@/components/dashboard/table";
import { ProductsPagination } from "@/components/product/products-pagination";
import Search from "@/components/product/search";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import ImageWithLoading from "@/components/ui/image-loading";
import { GET_PAGINATED_PRODUCTS_QUERY } from "@/lib/apollo/queries";
import { useQuery, useSuspenseQuery } from "@apollo/client";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Dashboard() {
  const { data: session } = useSession();
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const memoizedSetSearchTerm = useCallback(setSearchTerm, []);

  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState({});
  const [editProduct, setEditProduct] = useState(null);
  const [isProductFormModalOpen, setProductFormModalOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [imageForView, setImageForView] = useState({
    image: "",
    name: "",
  });

  useEffect(() => {
    if (session?.user?.role !== "admin") {
      redirect("/");
    }
  }, [session]);

  const {
    error,
    data,
    refetch,
    loading: isLoading,
  } = useQuery(GET_PAGINATED_PRODUCTS_QUERY, {
    variables: {
      limit: parseInt(rowsPerPage),
      offset: 0,
    },
  });

  useEffect(() => {
    if (data) {
      setProducts(data.products);
      setTotalProducts(data.products_aggregate.aggregate.count);
    }
  }, [data]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [products, searchTerm]);

  return (
    <>
      <div className="container mx-auto px-4 py-8 space-y-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">Products Management</h1>
          <Button size="sm" onClick={() => setProductFormModalOpen(true)}>
            <Plus size={16} />
            Add Product
          </Button>
        </div>
        <div className="flex w-full items-center justify-between">
          <Search
            searchTerm={searchTerm}
            setSearchTerm={memoizedSetSearchTerm}
            placeholder="Search products by name"
          />
          <Label className="ml-4">Total Products: {totalProducts}</Label>
        </div>

        <div className="relative overflow-x--scroll border rounded-lg  w-full h-full ">
          <Table
            products={filteredProducts}
            setEditProduct={setEditProduct}
            setProductFormModalOpen={setProductFormModalOpen}
            setDeleteModalOpen={setDeleteModalOpen}
            setDeleteProduct={setDeleteProduct}
            setImageModalOpen={setImageModalOpen}
            setImageForView={setImageForView}
            isLoading={isLoading}
            isError={error}
            rowsPerPage={rowsPerPage}
          />
          {!isLoading && (
            <div className="flex justify-end items-center p-4">
              <Select
                defaultValue={rowsPerPage}
                onValueChange={(value) => {
                  setRowsPerPage(value);
                  refetch({
                    limit: parseInt(value),
                    offset: 0,
                  });
                }}
              >
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Rows per page" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Rows per page</SelectLabel>
                    <SelectItem value={10}>10</SelectItem>
                    <SelectItem value={20}>20</SelectItem>
                    <SelectItem value={50}>50</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
        {filteredProducts.length > 0 &&
          searchTerm === "" &&
          rowsPerPage < totalProducts && (
            <ProductsPagination
              totalProducts={totalProducts}
              pageSize={rowsPerPage}
              refetch={refetch}
            />
          )}
      </div>
      <ShowImage
        isOpen={isImageModalOpen}
        onOpenChange={setImageModalOpen}
        src={imageForView.image}
        alt={imageForView.name}
      />
      <ShowDeleteProductModal
        isOpen={isDeleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        product={deleteProduct}
        setProducts={setProducts}
        setTotalProducts={setTotalProducts}
      />
      <ProductFormModal
        isOpen={isProductFormModalOpen}
        onOpenChange={setProductFormModalOpen}
        setProducts={setProducts}
        setTotalProducts={setTotalProducts}
        product={editProduct}
        setEditProduct={setEditProduct}
      />
    </>
  );
}

function ShowImage({ isOpen, onOpenChange, src, alt }) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[500px] max-h-[500px] p-0 rounded-xl overflow-hidden">
        <ImageWithLoading
          src={src}
          alt={alt}
          // className="w-full h-full object-cover rounded-lg cursor-pointer"
          // className="rounded-t-lg object-cover w-full h-full aspect-[4/3] cursor-pointer"
          width={500}
          height={500}
          quality={20}
        />
      </DialogContent>
    </Dialog>
  );
}
