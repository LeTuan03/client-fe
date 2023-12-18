import campaignApi from "apis/campaignApi";
import HeaderPage from "page/components/HeaderPage";
import {useState, useEffect, useContext} from "react";
import { Link } from "react-router-dom";
import {MyUserContext} from "../../App";
import {useQuery} from "react-query";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
function MediaPage() {
    const {data, isLoading} = useQuery({
        queryKey: "campaigns",
        queryFn: () => campaignApi.listCampaign()
    })
    const {title, changeTitle} = useContext(MyUserContext)
    useEffect(() => {
        changeTitle("Thư viện ảnh")
    }, []);
    return (
        <div className={"lg:w-3/5 mx-auto relative lg:px-10 px-0 py-10"}>
            <Swiper
            className="h-[450px]"
                 slidesPerView={1}
                 spaceBetween={10}
                 pagination={{
                   clickable: true,
                 }}
                 breakpoints={{
                   640: {
                     slidesPerView: 1,
                     spaceBetween: 20,
                   },
                   768: {
                     slidesPerView: 2,
                     spaceBetween: 40,
                   },
                   1024: {
                     slidesPerView: 3,
                     spaceBetween: 50,
                   },
                 }}
                 modules={[Pagination]}
            >
            { !!data &&
                    data.filter(e => e.status === true).map((report, index) => (
                        <SwiperSlide key={index} className="border-2  w-[350px] h-[550px]  p-3 rounded-xl transition-all duration-700 hover:shadow-2xl ">
                            <div className="flex flex-col justify-center w-full h-full items-center gap-3 overflow-hidden">
                            <h1 className="text-[20px] font-semibold">{report.name}</h1>
                            <Link to={`/mediaImage/${report.campaignId}`} className="px-4 py-2 transition-all duration-700 border-2 rounded-full hover:text-white hover:bg-red-400">Khoảnh khoắc</Link>
                            <Link to={`/mediaVideo/${report.campaignId}`} className="px-4 py-2 transition-all duration-700 border-2 rounded-full hover:text-white hover:bg-blue-400">Thước phim</Link>
                            </div>

                        </SwiperSlide>
                    ))
                }
            </Swiper>
        </div>
    )
}

export default MediaPage;