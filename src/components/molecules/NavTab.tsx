import { useEffect, useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/router";
// import { CaretDown } from "@/src/components/atoms/vectors";
import { ICategories } from "@/src/utilities/types";
import { apiRequest } from "@/src/functions/offChain/apiRequests";
import Skeleton from "react-loading-skeleton";

const NavTab = () => {
  const [categories, setCategories] = useState<Array<ICategories> | null>(null);
  const [category, setCategory] = useState<Record<string, string> | null>(null);
  const [active, setActive] = useState("");
  const { push } = useRouter();
  const fetchCategories = async () => {
    try {
      const HEADER = "";
      const REQUEST_URL = "category/index";
      const METHOD = "GET";
      const DATA = {};
      apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
        if (response.status == 400) {
          var error = response.data.error;
          // toast(error);
          return;
        } else if (response.status == 401) {
          // toast("Unauthorized request!");
          return;
        } else if (response.status == 200) {
          setCategory(response.data.data[1]);
          setCategories(response.data.data);
        } else {
          // toast("Something went wrong, please try again!");
          return;
        }
      });
    } catch (error) {
      // toast("Something went wrong, please try again!");
      return;
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <div className="nav-tab-wrapper scrollbar-hide">
      {categories !== null
        ? categories.map((tab, i) => (
            <div key={tab.name}>
              <span
                className={clsx("tab", tab.name === active && "border-b-2")}
                onClick={() => {
                  setActive(tab.name);
                  push(`/category/${tab._id}`);
                }}
              >
                {tab.name}
              </span>
            </div>
          ))
        : Array(5)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={"navtab-loading" + i} height="1rem" width="5rem" />
            ))}
    </div>
  );
};

export default NavTab;
