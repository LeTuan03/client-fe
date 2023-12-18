import { MyUserContext } from "App";
import campaignApi from "apis/campaignApi";
import axios from "axios";
import HeaderPage from "page/components/HeaderPage";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom"
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Image } from "react-bootstrap";
import { Pagination, Navigation } from 'swiper/modules';
function MediaImage() {
    const {idcampaign} = useParams();
   
    
    const {data, isLoading} = useQuery({
        queryKey: "images",
        queryFn: () => {
            return axios.get("http://localhost:8080/volunteer-campaign-management/api/v1/getByIdCampagin/" + idcampaign)
        }
    })
    const {title, changeTitle} = useContext(MyUserContext)
    useEffect(() => {
        changeTitle("Khoảnh khắc ảnh")
    }, []);
    return(
        
        <div className="lg:w-3/5 w-full mx-auto py-10">
           <Swiper
             
             navigation={true}
             modules={[Pagination, Navigation]}
             autoplay={true}
           >
                {data && data?.data.map((value, index) => {
                    return <SwiperSlide key={index}>
                        <Image src={value?.image} className="mx-auto rounded-xl overflow-hidden shadow-xl h-full w-full" />    
                    </SwiperSlide>
                })}
           </Swiper>
        </div>
    )
}

export default MediaImage