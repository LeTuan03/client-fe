import { useState, useEffect } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";

import HeaderPage from "page/components/HeaderPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import axios from "axios";
import campaignApi from "apis/campaignApi";
function RegisterVolunteer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date_of_birth: null,
    address: "",
    campain_id: "",
    reason: "",
    status: false,
  });
  const [showError, setShowError] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  const handleDataChange = (key, value) => {
    if (key === "date_of_birth") {
      setFormData({ ...formData, date_of_birth: value });
    } else {
      setFormData({ ...formData, [key]: value });
    }
  };

  const calculateAge = (birthday) => {
    const ageDifMs = Date.now() - birthday.getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  const hanndleRegister = async () => {
    if (!formData.name) {
      setShowError(true);
      toast.error("Vui lòng nhập họ và tên!");
      return;
    }
    if (!formData.email) {
      setShowError(true);
      toast.error("Vui lòng nhập địa chỉ email!");
      return;
    }
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(formData.email)) {
      setShowError(true);
      toast.error(
        "Định dạng email không đúng! Vui lòng nhập đúng định dạng email, ví dụ: example@gmail.com"
      );
      return;
    }
    if (!formData.phone) {
      setShowError(true);
      toast.error("Vui lòng nhập số điện thoại!");
      return;
    }
    if (!/^\d{10}$/g.test(formData.phone)) {
      setShowError(true);
      toast.error(
        "Định dạng số điện thoại không đúng! Vui lòng nhập đúng định dạng của số điện thoại 10 chữ số, ví dụ 0987650043"
      );
      return;
    }
    if (!formData.date_of_birth) {
      setShowError(true);
      toast.error("Vui lòng nhập ngày tháng năm sinh!");
      return;
    }
    const birthday = new Date(formData.date);
    const age = calculateAge(birthday);
    if (age < 18) {
      setShowError(true);
      toast.error("Bạn chưa đủ 18 tuổi để đăng ký!");
      return;
    }
    if (!formData.address) {
      setShowError(true);
      toast.error("Vui lòng nhập địa chỉ!");
      return;
    }
    // if (!formData.department_request) {
    //   setShowError(true);
    //   toast.error("Vui lòng chọn bộ phận bạn muốn đăng ký!");
    //   return;
    // }
    // if (!formData.time_free) {
    //   setShowError(true);
    //   toast.error("Vui lòng nhập thời gian rảnh!");
    //   return;
    // }

    try {
      const response = await axios.post(
        "http://localhost:8080/volunteer-campaign-management/api/v1/RequestVolunteer/create",
        formData
      );

      setFormData({
        name: "",
        email: "",
        phone: "",
        date_of_birth: "",
        address: "",
        campain_id: "",
        status: false,
        reason: "",
      });

      // Xử lý phản hồi từ API ở đây
      console.log(response.data);
      toast.success("Đăng ký thành công!");
    } catch (error) {
      console.log(error);
      // Xử lý lỗi ở đây
      console.error(error);
      toast.error("Đăng ký thất bại!");
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    hanndleRegister();
  };
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await campaignApi.listCampaign();

        // Filter campaigns with end_Date greater than or equal to the current date
        const currentDateTime = new Date(); // Lấy ngày giờ hiện tại
        const filteredCampaigns = response.filter((campaign) => {
          const endDate = new Date(campaign.end_date);
          return endDate >= currentDateTime;
        });
        setCampaigns(response);
        // setFormData(prev => ({...prev, campain_id: filteredCampaigns[0]?.campain_id}))
      } catch (error) {
        console.error("Error fetching campaigns:", error);
      }
    };

    fetchCampaigns();
  }, []);
  return (
    <div
      className={
        "w-full relative bg-slate-300 flex md:flex-row flex-col justify-center items-center"
      }
    >
      <div className="w-full p-10 md:w-1/2 flex flex-col justify-center items-center">
        <h2 className="text-[45px] font-['Calistoga'] text-white mb-[41px]">
          TÌNH NGUYỆN VIÊN
        </h2>
        <Image src={"/images/Thư ngỏ.jpg"} className={"w-[300px]"} />
      </div>
      <div className={"p-10"}>
        <div className="bg-color-bg-form py-[17px] px-[27px] rounded-xl shadow-2xl">
          <h2 className="text-[39px] text-white text-center font-['Calistoga']">
            Đăng ký tình nguyện viên
          </h2>
          <span className="text-[20px] mb-[16px] mt-[12px] text-center block text-white">
            Thông tin đăng ký
          </span>
          <form
            className="flex flex-column items-center"
            onSubmit={handleSubmit}
          >
            <input
              className="bg-bg-color-content w-full px-[12px] py-[7px] mb-[12px] border-none focus:border-none"
              type="text"
              name="name"
              placeholder="Họ và tên"
              value={formData.name}
              onChange={(e) => handleDataChange("name", e.target.value)}
            />
            <div className="flex w-full">
              <div className="bg-bg-color-content w-[50%] px-[12px] py-[7px] mb-[12px] mr-[12px]">
                <DatePicker
                  className="bg-bg-color-content w-[100%]"
                  selected={formData?.date_of_birth}
                  onChange={(e) => handleDataChange("date_of_birth", e)}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Ngày sinh"
                />
              </div>
              <input
                className="bg-bg-color-content w-[50%] px-[12px] py-[7px] mb-[12px]"
                type="text"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => handleDataChange("email", e.target.value)}
              />
            </div>
            <input
              className="bg-bg-color-content w-full px-[12px] py-[7px] mb-[12px]"
              type="text"
              name="phone"
              placeholder="Số điện thoại"
              value={formData.phone}
              onChange={(e) => handleDataChange("phone", e.target.value)}
            />
            <input
              className="bg-bg-color-content w-full px-[12px] py-[7px] mb-[12px]"
              type="text"
              name="address"
              placeholder="Địa chỉ"
              value={formData.address}
              onChange={(e) => handleDataChange("address", e.target.value)}
            />

            <select
              className="bg-bg-color-content w-full px-[12px] py-[7px] mb-[12px]"
              name="campain_id"
              value={formData.campaign_id}
              onChange={(e) => handleDataChange("campain_id", e.target.value)}
            >
              <option value="">Chọn địa chỉ</option>
              {campaigns
                .filter((e) => e?.staus === 1 || e.statusId === 1)
                .map((campaign) => (
                  <option key={campaign.campaignId} value={campaign.campaignId}>
                    {campaign.name}
                  </option>
                ))}
            </select>

            <input
              className="bg-bg-color-content w-full px-[12px] py-[7px] mb-[12px]"
              type="text"
              name="reason"
              placeholder="Lý do bạn muốn đồng hành cùng chiến dịch?"
              value={formData.reason}
              onChange={(e) => handleDataChange("reason", e.target.value)}
            />
            <Button
              type="submit"
              className="px-[24px] pt-[15px] pb-[12px] text-color-btn-submit bg-btn-color font-bold"
            >
              GỬI ĐĂNG KÝ
            </Button>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default RegisterVolunteer;
