"use client";

import { clsx } from "clsx";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useState } from "react";

export function ProductsPagination({ totalProducts, pageSize, refetch }) {
  const [currentPage, setCurrentPage] = useState(1);
  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      const offset = (currentPage - 2) * pageSize;
      refetch({ limit: pageSize, offset: offset });
    }
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(totalProducts / pageSize)) {
      setCurrentPage(currentPage + 1);
      const offset = currentPage * pageSize;
      refetch({ limit: pageSize, offset: offset });
    }
  };

  return (
    <Pagination aria-label="Pagination" className="flex justify-center">
      <PaginationContent className="flex gap-4">
        <PaginationItem className="flex items-center">
          <PaginationPrevious
            onClick={handlePrevious}
            disabled={currentPage === 1}
            className={clsx(
              "transition-colors duration-400 transform ease-in-out",
              currentPage === 1
                ? "text-black bg-white hover:text-black hover:bg-white"
                : "text-white bg-black hover:text-white hover:bg-black cursor-pointer hover:scale-105 "
            )}
          />
        </PaginationItem>
        <PaginationItem className="flex items-center">
          <PaginationNext
            className={clsx(
              "transition-colors duration-400 transform ease-in-out",
              currentPage === Math.ceil(totalProducts / pageSize)
                ? "text-black bg-white hover:text-black hover:bg-white"
                : "text-white bg-black hover:text-white hover:bg-black cursor-pointer hover:scale-105"
            )}
            onClick={handleNext}
            disabled={currentPage === Math.ceil(totalProducts / pageSize)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
