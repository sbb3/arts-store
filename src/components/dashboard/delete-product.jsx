import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DELETE_PRODUCT_MUTATION } from "@/lib/apollo/mutations";
import { GET_PAGINATED_PRODUCTS_QUERY } from "@/lib/apollo/queries";
import { useToast } from "@/components/ui/use-toast";
import Error from "@/components/error";
import { useMutation } from "@apollo/client";

export default function ShowDeleteProductModal({
  isOpen,
  onOpenChange,
  product,
  setProducts,
  setTotalProducts,
}) {
  const [deleteProduct, { loading: mutationLoading, error: mutationError }] =
    useMutation(DELETE_PRODUCT_MUTATION, {
      refetchQueries: [{ query: GET_PAGINATED_PRODUCTS_QUERY }],
    });
  const { toast } = useToast();

  const handleOnDeleteProduct = async () => {
    try {
      const { data } = await deleteProduct({ variables: { id: product.id } });
      //   console.log(`data`, data);
      toast({
        title: "Success",
        description: "Product deleted successfully",
      });
      setProducts((prev) =>
        prev.filter((product) => product.id !== data.delete_products_by_pk.id)
      );
      setTotalProducts((prev) => prev - 1);
      onOpenChange(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product",
        status: "error",
      });
    }
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <h2 className="text-lg font-semibold">Delete Product</h2>
        <p>Are you sure you want to delete {product.name}?</p>
        <div className="flex justify-end gap-4 mt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleOnDeleteProduct}
            disabled={mutationLoading}
            className="bg-red-500 hover:bg-red-600"
          >
            Delete
          </Button>{" "}
        </div>
        {mutationError && <Error error={mutationError} />}
      </DialogContent>
    </Dialog>
  );
}
