import React from "react";
import { Link } from "react-router-dom";
import { type FC } from "react";
import { ROUTES } from "../../Routes";
import "./BreadCrumbs.css";

interface ICrumb {
  label: string;
  path?: string;
}

interface BreadCrumbsProps {
  crumbs: ICrumb[];
}

export const BreadCrumbs: FC<BreadCrumbsProps> = ({ crumbs }) => {
  return (
    <nav className="breadcrumbs-nav">
      <ul className="breadcrumbs">
        <li>
          <Link to={ROUTES.HOME}>
            Главная
          </Link>
        </li>

        {crumbs.map((crumb, index) => (
          <React.Fragment key={index}>
            <li className="slash">
              <i className="bi bi-chevron-right"></i>
            </li>
            {index === crumbs.length - 1 ? (
              <li className="active">{crumb.label}</li>
            ) : (
              <li>
                <Link to={crumb.path || "#"}>{crumb.label}</Link>
              </li>
            )}
          </React.Fragment>
        ))}
      </ul>
    </nav>
  );
};
