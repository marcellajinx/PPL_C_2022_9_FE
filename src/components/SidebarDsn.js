import React from "react";
import { Link } from "react-router-dom";
const SidebarDsn = (props) => {
  console.log(props);
  const { lists } = props;
  return (
    <aside className="w-64 text-sm" aria-label="SidebarDsn">
      <div className="overflow-y-auto py-4 px-5 mr-3 rounded bg-white">
        <ul className="space-y-2">
          {lists.map((li) => {
            if (!li.child) {
              return (
                <li>
                  <Link
                    to={li.url}
                    className="flex items-center p-2 font-normal text-gray-900 rounded-lg hover:bg-gray-100"
                  >
                    <img
                      aria-hidden="true"
                      className="flex-shrink-0 w-6 h-6 text-gray-500 transition duration-75 group-hover:text-gray-900"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      src={li.src}
                    ></img>
                    <span className="flex-1 ml-3 whitespace-nowrap">
                      {li.title}
                    </span>
                  </Link>
                </li>
              );
            } else {
              return (
                <ul>
                  <li>aaa</li>
                </ul>
              );
            }
          })}
        </ul>
      </div>
    </aside>
  );
};

export default SidebarDsn;
