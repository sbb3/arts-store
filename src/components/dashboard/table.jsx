import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash, Pencil, Eye } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

export default function TableWrapper({
  products,
  setEditProduct,
  setProductFormModalOpen,
  setDeleteModalOpen,
  setDeleteProduct,
  setImageModalOpen,
  setImageForView,
  isLoading,
  isError,
  rowsPerPage,
}) {
  let content = null;
  if (isLoading) {
    content =
      rowsPerPage > 0 &&
      Array.from({ length: rowsPerPage }).map((_, index) => (
        <TableRow key={index}>
          <TableCell>
            <Skeleton className="w-12 h-4" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-24 h-4" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-24 h-4" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-12 h-4" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-12 h-4" />
          </TableCell>
          <TableCell>
            <Skeleton className="w-24 h-4" />
          </TableCell>
        </TableRow>
      ));
  } else if (isError) {
    content = (
      <TableRow>
        <TableCell colSpan="6">
          <div className="text-center text-red-500">
            There was an error fetching the products.
          </div>
        </TableCell>
      </TableRow>
    );
  } else if (products.length === 0) {
    content = (
      <TableRow>
        <TableCell colSpan="6">
          <div className="text-center text-gray-500">No products found.</div>
        </TableCell>
      </TableRow>
    );
  } else {
    content = products?.map((product) => (
      <TableRow key={product.id}>
        <TableCell>{product.id}</TableCell>
        <TableCell>
          {product.name.length > 20
            ? product.name.substring(0, 20) + "..."
            : product.name}
        </TableCell>
        <TableCell>
          {product.description.length > 40
            ? product.description.substring(0, 40) + "..."
            : product.description}
        </TableCell>
        <TableCell>${product.price}</TableCell>
        <TableCell>
          <Eye
            className="cursor-pointer"
            onClick={() => {
              setImageModalOpen(true);
              setImageForView({
                image: product.image,
                name: product.name,
              });
            }}
          />
        </TableCell>
        <TableCell className="flex flex-col items-center justify-center sm:flex-row sm:items-center sm:justify-end gap-2">
          <Button
            className="mr-2"
            size="icon"
            variant="outline"
            onClick={() => {
              setEditProduct(product);
              setProductFormModalOpen(true);
            }}
          >
            <Pencil className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          <Button
            className="text-red-500"
            size="icon"
            variant="outline"
            onClick={() => {
              setDeleteModalOpen(true);
              setDeleteProduct(product);
            }}
          >
            <Trash className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </TableCell>
      </TableRow>
    ));
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Price</TableHead>
          <TableHead>Image</TableHead>
          <TableHead className="text-right"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>{content}</TableBody>
    </Table>
  );
}
