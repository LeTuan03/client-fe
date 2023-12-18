import React, { useContext, useEffect, useState } from "react";
import { Table, Pagination } from "react-bootstrap";
import "./Grateful.css";
import { useQuery } from "react-query";
import donorApi from "../../apis/donorApi";
import donateApi from "../../apis/donateApi";
import contributionsApi from "../../apis/contributionsApi";
import financialReportApi from "../../apis/financialReportApi";
import moment from "moment";
import { MyUserContext } from "../../App";

const ITEMS_PER_PAGE = 10;

export default function Grateful() {
  const [currentClientPage, setCurrentClientPage] = useState(1);
  const [currentAdminPage, setCurrentAdminPage] = useState(1);
  const [keyword, setKeyword] = useState("");
  const [keywordAdmin, setKeywordAdmin] = useState("");
  const [listFinancial, setListFinancial] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const { data: donorList } = useQuery({
    queryFn: () => contributionsApi.getAll(),
  });

  const { changeTitle } = useContext(MyUserContext);

  useEffect(() => {
    changeTitle("Tri ân");
  }, [changeTitle]);

  const clientIndexOfLastItem = currentClientPage * ITEMS_PER_PAGE;
  const clientIndexOfFirstItem = clientIndexOfLastItem - ITEMS_PER_PAGE;
  const currentClientItems = (
    searchResults?.data?.contributions || donorList?.data?.contributions
  )?.slice(clientIndexOfFirstItem, clientIndexOfLastItem);

  const adminIndexOfLastItem = currentAdminPage * ITEMS_PER_PAGE;
  const adminIndexOfFirstItem = adminIndexOfLastItem - ITEMS_PER_PAGE;
  const currentAdminItems = listFinancial?.slice(
    adminIndexOfFirstItem,
    adminIndexOfLastItem
  );

  const clientPaginate = (pageNumber) => setCurrentClientPage(pageNumber);
  const adminPaginate = (pageNumber) => setCurrentAdminPage(pageNumber);

  const handleChange = async (ev) => {
    setKeyword(ev.target.value);
    try {
      if (!ev.target.value) {
        const dataAll = await contributionsApi.getAll();
        setSearchResults(dataAll);
        return;
      }
      const data = await contributionsApi.search(ev.target.value);
      setSearchResults(data);
    } catch (error) {}
  };

  const handleChangeAdmin = async (ev) => {
    setKeywordAdmin(ev.target.value);
    try {
      if (!ev.target.value) {
        handleGetFinancial();
        return;
      }
      const data = await donateApi.searchDonor(ev.target.value);
      setListFinancial(data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetFinancial = async () => {
    try {
      const data = await donateApi.getAll();
      setListFinancial(data?.data);
    } catch (error) {}
  };

  useEffect(() => {
    handleGetFinancial();
  }, []);
  return (
    <div>
      <div className="w-full mt-10">
        <h2 className="font-['Calistoga'] text-text-color-title text-[45px] text-center mb-[23px]">
          GÓC TRI ÂN
        </h2>
        <h2 className="text-center text-[20px] px-20">
          Thay mặt ban tổ chức chúng tôi xin bày tỏ lòng biết ơn sâu sắc và cảm
          tạ các quý ân nhân trong hành trình lan tỏa yêu thương đến các mảnh
          đời có hoàn cảnh khó khăn trên khắp địa bàn tỉnh Nghệ An.
        </h2>
      </div>
      <div className="w-full flex justify-end">
        <input
          value={keyword}
          onChange={handleChange}
          type="text"
          placeholder="Tìm kiếm"
          className="border-2 border-slate-400 shadow-xl px-3 py-2 mr-10 rounded-full my-10"
        />
      </div>

      {/* client quyen gop */}
      <div className="px-14">
        <Table
          className="border-black text-center min-h-[500px]"
          striped
          bordered
          hover
          responsive
        >
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên</th>
              <th>Mô tả</th>
              <th>Ngày quyên góp</th>
              <th>Số tiền</th>
            </tr>
          </thead>
          <tbody>
            {currentClientItems &&
              currentClientItems.map((value, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{value?.name}</td>
                  {/* <th>{value?.campaign_name}</th> */}
                  <td>{value?.description}</td>
                  <td>{moment(value?.donate_date).format("l")}</td>
                  <td>{value?.price}</td>
                </tr>
              ))}
          </tbody>
        </Table>
        {(donorList?.data?.contributions ||
          searchResults?.data?.contributions) && (
          <Pagination className="justify-content-right">
            {[
              ...Array(
                Math.ceil(
                  (
                    searchResults?.data?.contributions ||
                    donorList?.data?.contributions
                  ).length / ITEMS_PER_PAGE
                )
              ),
            ].map((_, index) => (
              <Pagination.Item
                key={index + 1}
                active={index + 1 === currentClientPage}
                onClick={() => clientPaginate(index + 1)}
              >
                {index + 1}
              </Pagination.Item>
            ))}
          </Pagination>
        )}
      </div>

      {/* admin quyen gop */}
      <div className="w-full flex justify-end">
        <input
          value={keywordAdmin}
          onChange={handleChangeAdmin}
          type="text"
          placeholder="Tìm kiếm"
          className="border-2 border-slate-400 shadow-xl px-3 py-2 mr-10 rounded-full my-10"
        />
      </div>
      <div className="px-14">
        <Table
          className="border-black text-center min-h-[500px]"
          striped
          bordered
          hover
          responsive
        >
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên</th>
              <th>Chiến dịch ủng hộ</th>
              <th>Mô tả</th>
              <th>Ngày quyên góp</th>
              <th>Số tiền</th>
            </tr>
          </thead>
          <tbody>
            {/* {listFinancial &&
              listFinancial.map((value, index) => ( */}
            {currentAdminItems &&
              currentAdminItems.map((value, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{value?.name}</td>
                  <th>{value?.campaign_name}</th>
                  <td>{value?.description}</td>
                  <td>{moment(value?.donate_date).format("l")}</td>
                  <td>{value?.amount}</td>
                </tr>
              ))}
          </tbody>
        </Table>
        {listFinancial && (
          <Pagination className="justify-content-right">
            {[...Array(Math.ceil(listFinancial.length / ITEMS_PER_PAGE))].map(
              (_, index) => (
                <Pagination.Item
                  key={index + 1}
                  active={index + 1 === currentAdminPage}
                  onClick={() => adminPaginate(index + 1)}
                >
                  {index + 1}
                </Pagination.Item>
              )
            )}
          </Pagination>
        )}
      </div>
    </div>
  );
}
