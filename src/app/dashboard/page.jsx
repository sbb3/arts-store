"use client";

import Error from "@/components/error";
import { ProductsPagination } from "@/components/product/products-pagination";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { GET_PAGINATED_PRODUCTS_QUERY } from "@/lib/apollo/queries";
import { useSuspenseQuery } from "@apollo/client";
import { Plus } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import ProductFormModal from "@/components/dashboard/create-product";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { Loading } from "@/components/ui/loading";
import ShowDeleteProductModal from "@/components/dashboard/delete-product";
import Table from "@/components/dashboard/table";

export default function Dashboard() {
  const { data: session } = useSession();
  const [searchTerm, setSearchTerm] = useState("");
  const [isImageModalOpen, setImageModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteProduct, setDeleteProduct] = useState({});
  const [editProduct, setEditProduct] = useState(null);
  const [isProductFormModalOpen, setProductFormModalOpen] = useState(false);

  const [productsState, setProducts] = useState([]);
  const [totalProductsState, setTotalProducts] = useState(0);

  const [imageForView, setImageForView] = useState({
    image: "",
    name: "",
  });
  const limit = process.env.NEXT_PUBLIC_PRODUCTS_PER_PAGE || 10;

  useEffect(() => {
    if (session?.user?.role !== "admin") {
      redirect("/");
    }
  }, [session]);

  const { loading, error, data, refetch } = useSuspenseQuery(
    GET_PAGINATED_PRODUCTS_QUERY,
    {
      variables: {
        limit: parseInt(limit),
        offset: 0,
        searchTerm: `%${searchTerm}%`,
      },
    }
  );

  useEffect(() => {
    if (data) {
      console;
      setProducts(data.products);
      setTotalProducts(data.products_aggregate.aggregate.count);
    }
  }, [data]);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

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
        <div className="max-h-[500px] overflow-auto border rounded-lg">
          <Table
            products={productsState}
            setEditProduct={setEditProduct}
            setProductFormModalOpen={setProductFormModalOpen}
            setDeleteModalOpen={setDeleteModalOpen}
            setDeleteProduct={setDeleteProduct}
            setImageModalOpen={setImageModalOpen}
            setImageForView={setImageForView}
          />
        </div>
        {productsState?.length > 0 && (
          <ProductsPagination
            totalProducts={totalProductsState}
            pageSize={parseInt(limit)}
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
        <Image
          alt={alt}
          className="object-cover w-full h-full"
          src={src}
          quality={100}
          width={500}
          height={500}
          loader={({ src }) => src}
        />
      </DialogContent>
    </Dialog>
  );
}
