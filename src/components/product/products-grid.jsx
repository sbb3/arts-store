"use client";

import Error from "@/components/error";
import { Loading } from "@/components/ui/loading";
import { GET_PAGINATED_PRODUCTS_QUERY } from "@/lib/apollo/queries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import ProductCard from "./product-card";
import { ProductsPagination } from "./products-pagination";
import Search from "./search";
// import { useSession } from "next-auth/react";
import { useCallback } from "react";

export default function ProductsGrid() {
  // const session = useSession();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const memoizedSetSearchTerm = useCallback(setSearchTerm, []);

  const limit = process.env.NEXT_PUBLIC_PRODUCTS_PER_PAGE || 10;
  const { loading, error, data, refetch } = useQuery(
    GET_PAGINATED_PRODUCTS_QUERY,
    {
      variables: {
        limit: parseInt(limit),
        offset: 0,
      },
    }
  );

  useEffect(() => {
    if (data) {
      setProducts(data.products);
      setTotalProducts(data.products_aggregate?.aggregate?.count);
    }
  }, [data]);

  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [products, searchTerm]);

  // if (loading) return <Loading />;
  // if (error) return <Error error={error} />;

  return (
    <div className="flex flex-col w-full gap-6 ">
      <Search
        searchTerm={searchTerm}
        setSearchTerm={memoizedSetSearchTerm}
        placeholder="Search products by name"
      />
      <div className="flex-1">
        {loading ? (
          <Loading />
        ) : error ? (
          <Error error={error} />
        ) : (
          <div
            className="animate-in grid
      grid-cols-1
    sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {filteredProducts?.length > 0 &&
              filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        )}
      </div>
      {filteredProducts?.length === 0 && searchTerm === "" && (
        <div className="flex justify-center items-center">
          <p className="text-md font-semibold text-gray-500">
            No arts boards products available
          </p>
        </div>
      )}
      {filteredProducts?.length === 0 && searchTerm !== "" && (
        <div className="flex justify-center items-center">
          <p className="text-md font-semibold text-gray-500">
            No products found for {searchTerm}
          </p>
        </div>
      )}
      {filteredProducts?.length > 0 && searchTerm === "" && (
        <ProductsPagination
          totalProducts={totalProducts}
          pageSize={parseInt(limit)}
          refetch={refetch}
        />
      )}
    </div>
  );
}
