import { useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { NavLinks } from "@/types/navlink";

export function BreadcrumbBar({ secondLink = "", link = "", name }: NavLinks) {
  const navigate = useNavigate();
  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href={!secondLink ? "/shop" : `/${link}`}>
            {!secondLink ? "Shop" : secondLink}
          </BreadcrumbLink>
        </BreadcrumbItem>
        {link && <BreadcrumbSeparator />}
        <BreadcrumbItem
          className="cursor-pointer"
          onClick={() => navigate(`/shop/${link}`)}
        >
          <BreadcrumbLink>{link}</BreadcrumbLink>
        </BreadcrumbItem>
        {name && <BreadcrumbSeparator />}
        <BreadcrumbItem>
          <BreadcrumbPage>{name}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
