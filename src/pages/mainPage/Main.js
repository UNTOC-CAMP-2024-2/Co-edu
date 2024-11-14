import React, { useState } from "react";
import mainImg from "../../images/mainImg.png";
import { FaCheck } from "react-icons/fa";
import { PiHashBold } from "react-icons/pi";
import StudyOpenModal from "./Components/StudyOpenModal";
import StudyComponent from "./Components/StudyComponent";
import { useOutletContext } from "react-router-dom";

// Link 태그들 to 속성 값에 맞게 경로 설정 필요

const Main = () => {
  const [isModalOpen, setIsModalOpen] = useOutletContext();
  // 고정된 헤더바와 isModalOpen 상태를 공유할 방법 찾아야 함
  return (
    <div className="mx-20 min-h-[calc(100vh-110px)] flex flex-col">
      <div className="flex gap-14 mx-1">
        <div className="w-[34rem] ml-10">
          <img
            className="w-full h-full object-cover"
            src={mainImg}
            alt="메인 이미지"
          />
        </div>
        <div className="flex flex-grow justify-center items-center flex-col space-y-6">
          <div className="text-black font-bold text-[2.3rem]">
            스터디 참여하기
          </div>
          <div>
            <form className="flex items-center rounded-full py-[0.4rem] pr-[0.6rem] pl-[0.9rem] justify-between border-2 border-darkMint shadow-md w-[26rem]">
              <PiHashBold color="#54CEA6" size="25" />
              <input className="flex-grow outline-none ml-2 mr-3 text-[1.5rem] font-semibold text-lightBlack italic tracking-wide" />
              <button className="bg-darkMint rounded-full p-[0.4rem]">
                <FaCheck color="white" size="18" />
              </button>
            </form>
          </div>
        </div>
      </div>
      <hr className="my-2 bg-hrColor h-[1px] border-0" />
      <div className="flex flex-col mx-7 mt-2 flex-grow">
        <div className="flex gap-[1.6rem]">
          <button className="flex text-center text-sm font-semibold border-2 border-[#CED4DA] text-[#495057] px-[0.8rem] py-[0.5rem] rounded-full">
            🍀전체 스터디 룸
          </button>
          <button className="flex text-center text-sm font-semibold border-2 border-[#CED4DA] text-[#495057] px-[0.8rem] py-[0.5rem] rounded-full">
            👑나의 스터디 룸
          </button>
        </div>
        <div className="flex-grow items-center flex gap-[2rem] overflow-x-scroll">
          <StudyComponent />
          <StudyComponent />
          <StudyComponent />
          <StudyComponent />
          <StudyComponent />
          <StudyComponent />
          <StudyComponent />
          <StudyComponent />
          <StudyComponent />
          <StudyComponent />
          <StudyComponent />
          <StudyComponent />
        </div>
      </div>
      {isModalOpen && <StudyOpenModal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};

export default Main;
