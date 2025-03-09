import * as React from "react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { ChevronDown, Dot } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useNavigate } from "react-router-dom";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

export function DropdownMenuRadio() {
  const [position, setPosition] = React.useState("bottom");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className=" text-lg md:tsxt-sm m-0 p-0 hover:bg-transparent font-normal"
        >
          Shop <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56   transform translate-x-9 md:translate-x-20 border-none shadow-none">
        <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuRadioGroup value={position} onValueChange={setPosition}>
          <DropdownMenuRadioItem value="top">Top</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="bottom">Bottom</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="right">Right</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function PaginationDemo({
  totalPages,
  currentPage,
  setCurrentPage,
}: {
  totalPages: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}) {
  const handlePageChange = (page: number) => {
    window.scrollTo(0, 30);
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 2, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages - 1);
      pages.push(totalPages);
    }

    return pages;
  };

  return (
    <Pagination>
      <PaginationContent className="flex justify-between w-full">
        <PaginationItem>
          <PaginationPrevious
            className=" text-primary border border-gray-300 hover:bg-gray-100 rounded-md cursor-pointer"
            onClick={() => handlePageChange(currentPage - 1)}
            aria-disabled={currentPage === 1}
          />
        </PaginationItem>

        <div className=" flex">
          {renderPagination().map((page, index) =>
            page === "..." ? (
              <PaginationItem key={index}>
                <span className="px-3">...</span>
              </PaginationItem>
            ) : (
              <PaginationItem key={index}>
                <PaginationLink
                  className="cursor-pointer"
                  isActive={currentPage === page}
                  onClick={() => handlePageChange(Number(page))}
                >
                  {page}
                </PaginationLink>
              </PaginationItem>
            )
          )}
        </div>

        <PaginationItem>
          <PaginationNext
            className="border text-primary border-gray-300 hover:bg-gray-100 rounded-md cursor-pointer"
            onClick={() => handlePageChange(currentPage + 1)}
            aria-disabled={currentPage === totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}

export function SelectDemo({
  options,
  placeholder = "Select an option",
  onChange,
}: {
  options: string[];
  placeholder?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <Select onValueChange={onChange}>
      <SelectTrigger className=" text-primary font-bold  border-0  outline-none focus:border-0 focus:outline-none  p-0">
        <SelectValue className="" placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((value) => (
          <SelectItem key={value} value={value}>
            {value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

// when i open the page first time it shows i will load the categories for api
// i chang the const comoponent to props

export function NavigationMenuDemo({
  categories,
}: {
  categories: { title: string; list: string[] }[];
}) {
  const navigate = useNavigate();

  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuTrigger className="">Shop</NavigationMenuTrigger>
          <NavigationMenuContent>
            <div className="grid  gap-3 py-3 px-4 w-[20rem] grid-cols-2  md:w-[500px] md:grid-cols-3 lg:w-[600px]  ">
              {categories.map((categorie) => (
                <ul key={categorie.title}>
                  <h5 className=" text-sm md:text-lg font-bold text-primary">
                    {categorie.title}
                  </h5>
                  {categorie.list.map((item) => (
                    <li
                      className=" max-sm:text-xs flex items-center  w-full"
                      key={item}
                    >
                      <a
                        className="text-gray-500 cursor-pointer hover:underline hover:text-primary flex items-center "
                        onClick={() => navigate(`/shop/${item}`)}
                      >
                        <Dot /> {item}
                      </a>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}
