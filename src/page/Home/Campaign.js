import {Image} from "react-bootstrap";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper/modules';
import { useQuery } from "react-query";
import campaignApi from "apis/campaignApi";
import { useNavigate } from "react-router-dom";
const CardCampaign = ({image, title, content, id}) => {
    const nav = useNavigate()
    return <div className={"w-full flex flex-wrap"}>
        <div className={"md:w-1/2 max-w-[555px] p-10"}>
            <Image src={image || "/images/image.png"} />
        </div>
        <div className={"md:w-1/2 w-full p-10"}>
            <span className={'text-[25px]'}>{title || "Mỗi bước chân đều đáng giá"}</span>
            <p className={"mt-10"}>
                {/* {content || "Not found"} */}
            </p>
            <button onClick={() => nav(`chiendich/${id}`)} className={"py-2 px-4 mt-10 border-2 hover:text-white hover:bg-green-600 border-green-500 rounded-full transition-all duration-700"}><a href=""></a>Tìm hiểu thêm</button>
        </div>
    </div>
}

function Campaign() {
    const {data} = useQuery({
        queryKey:"campaigns",
        queryFn: () => campaignApi.listCampaign()
    })
    return (
        <div className={"w-full"}>
            <div className={"w-full text-center text-[30px] font-semibold"}>
                Chiến dịch từ thiện
            </div>
            <div className={"md:w-4/5 mx-auto py-10"}>
                <Swiper
                    
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    autoplay={true}
                    
                >
                    {data && data?.filter(e => e.status === true && e?.statusId === 1).map((value, index) => {
                        return <SwiperSlide key={index}><CardCampaign id={value?.campaignId}  content={value?.content} title={value?.title || value?.name} image={value?.image} /></SwiperSlide>
                    })}
                    
                    
                    
                </Swiper>
            </div>
        </div>
    );
}

export default Campaign;



