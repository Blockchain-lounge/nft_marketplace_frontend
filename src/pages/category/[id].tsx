//@ts-nocheck
import { Heading2, Button } from "@/src/components/atoms";
import { NftCardSkeleton } from "@/src/components/lazy-loaders";
import {
  CategoryHeroCard,
  CollectionCard,
  NftHeaderCard,
  NftMediumCard2,
  Tab,
} from "@/src/components/molecules";
import { INftcard } from "@/src/components/molecules/NftMediumCard";
import { Footer } from "@/src/components/organisms";
import DashboardLayout from "@/src/template/DashboardLayout";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { apiRequest } from "../../functions/offChain/apiRequests";
import { toast } from "react-toastify";

const CategoryPage = () => {
  const [categoryBannerImg, setCategoryBannerImg] = useState(true);
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(1);
  const [collections, setCollections] = useState([]);
  const [category, setCategory] = useState<INftcard[]>([]);
  const [nfts, setNfts] = useState([]);
  const [activeTab, setActiveTab] = useState("Collections");
  const exploreTabs = ["Collections", "NFTs"];
  const {
    push,
    query: { id },
  } = useRouter();
  const fetchCategoryDetail = async () => {
    if (id !== undefined) {
      const HEADER = {};
      const REQUEST_URL = "category/collections/" + id + "?page=" + currentPage;
      const METHOD = "GET";
      const DATA = {};
      apiRequest(REQUEST_URL, METHOD, DATA, HEADER).then((response) => {
        if (response.status == 400) {
          var error = response.data.error;
          toast(error);
          push("/");
          return;
        } else if (response.status == 200) {
          setCollections(response.data.createdCollections);
          setTotalPages(response.data.totalPages);
          setCurrentPage(response.data.currentPage);
          setNextPage(response.data.nextPage);

          setCategory(response.data.category);
        } else {
          // toast("Something went wrong, please try again!");
          return;
        }
      });
    }
  };

  useEffect(() => {
    fetchCategoryDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, currentPage]);
  return (
    <DashboardLayout>
      <CategoryHeroCard category={category} />
      <div className="mt-20">
        <NftHeaderCard
          heading="Collections"
          to="/explore"
          // selectTitle="Last 24 hours"
        />
        {collections && collections.length === 0 ? (
          "No matching collections found"
        ) : collections && collections.length > 0 ? (
          <div className="explore-items-wrapper">
            {collections.map((item) => (
              <CollectionCard key={item._id} {...item} />
            ))}
          </div>
        ) : (
          <div className="flex flex-wrap justify-evenly lg:justify-between gap-y-12">
            {Array(9)
              .fill(0)
              .map((_, i) => (
                <NftCardSkeleton key={i + "explore-skeleton-card"} />
              ))}
          </div>
        )}
      </div>
      <div className="mt-8">
        {nextPage < totalPages ? (
          <Button
            title="Load More"
            onClick={() => setCurrentPage(currentPage + 1)}
          />
        ) : (
          ""
        )}
      </div>
    </DashboardLayout>
  );
};

export default CategoryPage;
