import campaignApi from "apis/campaignApi";
import axios from "axios";
import HeaderPage from "page/components/HeaderPage";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { useQuery } from "react-query";
import { MyUserContext } from "App";

function MediaVideo() {
    const { idcampaign } = useParams();


    const { data, isLoading } = useQuery({
        queryKey: "images",
        queryFn: () => {
            return axios.get("http://localhost:8080/volunteer-campaign-management/api/v1/getByIdCampagin/" + idcampaign)
        }
    })
    const { title, changeTitle } = useContext(MyUserContext)
    useEffect(() => {
        changeTitle("Khoảnh khắc video")
    }, []);
    console.log(data);
    return (
        <div className="lg:w-3/5 flex flex-col justify-center items-center gap-10  mx-auto w-full rounded-xl overflow-hidden lg:px-10 px-0 py-10">
            {data && data?.data.map((value, index) => {
                return <video controls className="w-2/3 mx-auto">
                    <source src={value?.video} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            })}
        </div>
    )
}

export default MediaVideo