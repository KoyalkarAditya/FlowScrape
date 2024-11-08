"use client";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbList,
} from "./ui/breadcrumb";
import React from "react";
import { MobileSidebar } from "./SideBar";

const BreadcrumbHeader = () => {
  const pathname = usePathname();
  const paths = pathname == "/" ? [""] : pathname.split("/");
  return (
    <div className="flex items-center flex-start">
      <MobileSidebar />
      <Breadcrumb>
        <BreadcrumbLink>
          {paths.map((path, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink className="capitalize" href={`/${path}`}>
                  {path == "" ? "home" : path}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbLink>
      </Breadcrumb>
    </div>
  );
};

export default BreadcrumbHeader;
