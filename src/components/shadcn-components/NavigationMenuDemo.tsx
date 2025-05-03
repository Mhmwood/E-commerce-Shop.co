
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { useNavigate } from "react-router-dom";

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
                        {item}
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
