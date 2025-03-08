import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, Dot } from "lucide-react";

interface Category {
  title: string;
  list: string[];
}

interface CollapsibleMenuProps {
  categories: Category[];
}

const CollapsibleMenu: React.FC<CollapsibleMenuProps> = ({ categories }) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);
  const navigate = useNavigate();

  const toggleCollapse = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="w-full space-y-1">
      {categories.map((category, index) => (
        <div key={category.title} className="rounded-lg">
          <button
            onClick={() => toggleCollapse(index)}
            className="flex w-full items-center justify-between p-3 text-left text-sm font-medium  rounded-lg transition"
          >
            {category.title}
            <ChevronRight
              className={`h-5 w-5 transition-transform ${
                openIndexes.includes(index) ? "rotate-90" : ""
              }`}
            />
          
          </button>
          {openIndexes.includes(index) && (
            <ul className="space-y-1 pl-4">
              {category.list.map((item) => (
                <li className=" flex items-center  w-full" key={item}>
                  <a
                    className="text-gray-500 cursor-pointer hover:underline hover:text-primary flex items-center "
                    onClick={() => navigate(`/shop/${item}`)}
                  >
                    <Dot /> {item}
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default CollapsibleMenu;
