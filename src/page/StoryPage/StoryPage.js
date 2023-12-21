import React, { memo, useContext, useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./StoryPage.css";
import LoadingSnip from "../../components/Loading/LoadingSnip";
import { useQuery } from "react-query";
import storyApi from "../../apis/storyApi";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";
import { MyUserContext } from "../../App";

import Pagination from "react-bootstrap/Pagination";

const ITEMS_PER_PAGE = 3;

const CardStory = memo(({ image, title, storyId, content, name }) => {
  const [hover, setHover] = useState(false);
  const nav = useNavigate();
  return (
    <motion.div
      onHoverStart={() => setHover(true)}
      onHoverEnd={() => setHover(false)}
      className={
        "w-[370px] border-2 text-black mx-auto hover:shadow-2xl transition-all duration-700 flex flex-col justify-center overflow-hidden"
      }
    >
      <motion.div className={"w-full"}>
        <Image
          className={`w-full scale-${
            hover ? "110" : "100"
          } transition-all duration-700`}
          src={image}
        />
      </motion.div>
      <div
        className={"w-full p-5 flex flex-col justify-center items-start gap-3"}
      >
        <div className={"text-[20px] font-bold text-black"}>
          {title || name}
        </div>
        <div>{content}</div>
        <motion.button
          onClick={() => nav(`/cauchuyen/${storyId}`)}
          className={`text-left py-2 rounded-2xl flex flex-row ${
            hover ? "bg-[#213360] text-white" : "bg-transparent"
          } justify-center items-center gap-3 px-${
            hover ? "5" : "0"
          } transition-all duration-700`}
        >
          Tìm hiểu thêm
          <FaArrowRight />
        </motion.button>
      </div>
    </motion.div>
  );
});
const StoryPage = () => {
  const { data, isLoading } = useQuery({
    queryKey: "stories",
    queryFn: () => storyApi.listStories(),
  });

  const { title, changeTitle } = useContext(MyUserContext);
  useEffect(() => {
    changeTitle("Câu chuyện");
  }, []);

  const [currentPage, setCurrentPage] = useState(1);

  const IndexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const IndexOfFirstItem = IndexOfLastItem - ITEMS_PER_PAGE;
  const currentItems = data?.slice(IndexOfFirstItem, IndexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className={"lg:w-4/5 m-auto w-full"}>
      <div
        className={
          "min-h-screen py-10 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1"
        }
      >
        {isLoading && <LoadingSnip />}
        {!!currentItems &&
          currentItems?.map((value, index) => {
            return (
              <CardStory
                key={index}
                storyId={value?.storyId}
                content={value?.content}
                image={value?.image}
                title={value?.title}
                name={value?.name}
              />
            );
          })}
      </div>
      {data && (
        <Pagination className="justify-content-right">
          {[...Array(Math.ceil(data.length / ITEMS_PER_PAGE))].map(
            (_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentPage}
                onClick={() => paginate(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            )
          )}
        </Pagination>
      )}
    </div>
  );
};

export default StoryPage;
