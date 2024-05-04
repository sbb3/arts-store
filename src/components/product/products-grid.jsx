"use client";

import ProductCard from "./product-card";
import { GET_PAGINATED_PRODUCTS_QUERY } from "@/lib/apollo/queries";
import { ProductsPagination } from "./products-pagination";
import { useSuspenseQuery } from "@apollo/client";
import { useEffect, useRef, useState } from "react";
import Search from "./search";
import { Loading } from "@/components/ui/loading";
import Error from "@/components/error";
// import { useSession } from "next-auth/react";

export default function ProductsGrid() {
  // const session = useSession();
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const searchTermRef = useRef(searchTerm);

  useEffect(() => {
    searchTermRef.current = searchTerm;
  }, [searchTerm]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchTerm(searchTermRef.current);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [searchTermRef.current]);

  const limit = process.env.NEXT_PUBLIC_PRODUCTS_PER_PAGE || 10;
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
      setProducts(data.products);
      setTotalProducts(data.products_aggregate?.aggregate?.count);
    }
  }, [data]);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  return (
    <div className="flex flex-col w-full gap-6 ">
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div className="flex-1">
        <div
          className="animate-in grid
      grid-cols-1
    sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      {products?.length === 0 && (
        <div className="flex justify-center items-center">
          <p className="text-md font-semibold text-gray-500">
            No arts boards products available
          </p>
        </div>
      )}
      {products?.length > 0 && (
        <ProductsPagination
          totalProducts={totalProducts}
          pageSize={parseInt(limit)}
          refetch={refetch}
        />
      )}
    </div>
  );
}
