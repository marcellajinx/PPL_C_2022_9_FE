import { Link } from "react-router-dom";
import React from "react";
const Sidebar = (props) => {
  const { lists } = props;
  return (
    <aside className="w-64 text-sm" aria-label="Sidebar">
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
                <li>
                  <>
                    <Link
                      to={li.url}
                      className="p-0 font-normal text-gray-900 rounded-lg"
                    >
                      <div className="flex items-center p-2 font-normal text-gray-900 rounded-lg hover:bg-gray-100">
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
                      </div>

                      <ul className="pl-6">
                        {li.child.map((ls) => {
                          return (
                            <li className="py-2">
                              <Link
                                to={ls.url}
                                className="p-2 font-normal text-gray-900 rounded-lg"
                              >
                                <span className="flex-1 ml-3 whitespace-nowrap">
                                  {ls.title}
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </Link>
                  </>
                </li>
              );
            }
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
