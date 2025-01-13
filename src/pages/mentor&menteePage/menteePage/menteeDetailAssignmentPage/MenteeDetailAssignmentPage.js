import React, { useRef, useEffect, useState, useContext } from "react";
import Highlight from "react-highlight";
import { HiSpeakerphone } from "react-icons/hi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useLocation } from "react-router-dom";
import "../../../../../node_modules/highlight.js/styles/a11y-dark.css";
import { useSubmitCode, useTestCode } from "../../../../hooks/useMentee";
import { Context } from "../../../../AppProvider";

const feedbackData = {
  feedback: `impordddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddddt pandas as sns 난 sns에 pandas를 올려버릴 거야 라는 말은 안되겠지 하지만 총평으로 뭘 적어야할 지 모르겠단 말이야 일단 아무말이나 적고 검토 받아야지 지금 시각은 3시 16분 어 배고파 진짜 짜증의 김치찌개 스트레스 모두가 벗어났으면 그럼 나만 이렇게 배고프진 않았겠지 ㅠㅠ 이번 주 다음 주 너무 바쁘고요 ,, 나는 아무것도 몰라 하지만 벌써 2학년 인걸 힘내야지 뭐 어쩌겠어 내년엔 또 뭐하지 ? 어 배고파 진짜 야 바보가 지피티한테 총평 써달라 할걸 ,,,`,
};

const MenteeDetailAssignmentPage = () => {
  const data = useLocation().state.problem;
  console.log(data);

  const { title, description, testcases } = data;
  const { feedback } = feedbackData;

  const textareaRef = useRef(null);
  const highlightRef = useRef(null);
  const { token, assignmentId } = useContext(Context);

  const [code, setCode] = useState('print("hello world")');
  const [showResult, setShowResult] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [testResult, setTestResult] = useState();

  const submitCodeMutatation = useSubmitCode();
  const testCodeMutation = useTestCode();

  const handleSubmitCode = () => {
    submitCodeMutatation.mutate({
      token,
      assignmentId: data.assignment_id,
      code,
    });
  };

  const handleTestCode = () => {
    console.log({
      token,
      assignmentId: data.assignment_id,
      code,
      language: "python",
    });
    testCodeMutation.mutate(
      {
        token,
        assignmentId: data.assignment_id,
        code,
        language: "python",
      },
      {
        onSuccess: (data) => {
          setTestResult(data);
        },
      }
    );
    setShowResult(true);
  };

  useEffect(() => {
    console.log(testResult);
  }, [testResult]);

  // Ref for the left panel
  const leftPanelRef = useRef(null);
  const feedbackTextareaRef = useRef(null);

  // Custom scroll handler
  const handleWheel = (event) => {
    if (leftPanelRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = leftPanelRef.current;

      // 위로 스크롤하려 할 때 (deltaY < 0) 이고 이미 맨 위라면 (scrollTop === 0)
      // 또는
      // 아래로 스크롤하려 할 때 (deltaY > 0) 이고 이미 맨 아래라면 (scrollTop + clientHeight === scrollHeight)
      if (
        (event.deltaY < 0 && scrollTop === 0) ||
        (event.deltaY > 0 && scrollTop + clientHeight >= scrollHeight)
      ) {
        return; // 기본 스크롤 동작 허용
      }

      leftPanelRef.current.scrollTop += event.deltaY;
      // event.preventDefault();
    }
  };

  // 스크롤 동기화를 위한 핸들러
  const handleScroll = (e) => {
    if (highlightRef.current) {
      highlightRef.current.scrollTop = e.target.scrollTop;
      // highlightRef.current.scrollLeft = e.target.scrollLeft;
    }
  };

  useEffect(() => {
    const updateHeight = () => {
      if (feedbackTextareaRef.current) {
        feedbackTextareaRef.current.style.height = "auto"; // 높이를 초기화
        feedbackTextareaRef.current.style.height = `${Math.max(
          feedbackTextareaRef.current.scrollHeight,
          300 // 최소 높이
        )}px`; // 콘텐츠에 맞게 높이 설정
      }
    };

    // 상태 변경 시 높이 업데이트
    if (showFeedback) {
      updateHeight();
    }

    // DOM 변경 시 자동 업데이트를 위해 MutationObserver 추가
    const observer = new MutationObserver(updateHeight);
    if (feedbackTextareaRef.current) {
      observer.observe(feedbackTextareaRef.current, {
        childList: true,
        subtree: true,
      });
    }

    // Cleanup
    return () => observer.disconnect();
  }, [feedback, showFeedback]);

  // Disable global scrolling
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = ""; // Restore scrolling on component unmount
    };
  }, []);

  return (
    <div className="relative flex flex-row h-[calc(100vh-65px)]">
      {/* Left Panel */}
      <div
        ref={leftPanelRef}
        onWheel={handleWheel}
        className="w-[400px] py-[35px] bg-white overflow-hidden relative"
        style={{ WebkitOverflowScrolling: "touch" }} // For smooth scrolling on touch devices
      >
        {/* Assignment Title */}
        <h1 className="text-[30px] px-[30px] font-bold text-gray-800 mb-[15px]">
          {title}
        </h1>

        {/* Assignment Description */}
        <p className="px-[25px] text-[18px] text-[#525252] mb-[25px] leading-relaxed">
          {description}
        </p>

        {/* Content Switching */}
        {showFeedback ? (
          /* 과제 코드 총평 */
          <div className="mb-[30px] flex flex-col items-center">
            <h2 className="text-[16px] font-semibold text-[#525252] mb-[10px]">
              과제 코드 총평
            </h2>
            <div className="w-full border-t-[1px] border-[#D9D9D9] mb-[10px]"></div>
            <textarea
              ref={feedbackTextareaRef}
              readOnly
              value={feedback}
              className="w-[calc(100%-40px)] px-[15px] py-[10px] border-[2px] border-[#54CEA6] bg-[#F8FFF9] rounded-[10px] text-[16px] text-[#525252] leading-[24px] resize-none focus:outline-none"
              style={{
                height: feedbackTextareaRef.current?.scrollHeight
                  ? `${Math.max(
                      feedbackTextareaRef.current.scrollHeight,
                      300
                    )}px`
                  : "300px",
                overflow: "hidden",
              }}
            ></textarea>
          </div>
        ) : (
          /* Examples Section */
          testcases.map((example, index) => (
            <div key={index} className="mb-3">
              <div className="mb-4 mx-[28px]">
                <h2 className="mx-[5px] text-[20px] text-black mb-2 pl-[5px]">
                  예제 {index + 1}
                </h2>
                <div className="relative mt-1 mb-5">
                  <div className="absolute w-full h-[1px] rounded bg-[#D9D9D9] top-[1px]"></div>
                  <div className="absolute w-[80px] h-[3px] rounded bg-[#A8E6CF]"></div>
                </div>
              </div>

              {/* 입력 */}
              <div className="mx-[30px] mb-[10px] flex items-center space-x-[10px]">
                <h3 className="text-[18px] text-[#525252]">입력</h3>
                <textarea
                  value={example.input}
                  readOnly
                  className="flex-1 px-[20px] py-[5px] border-[2px] border-[#969696] rounded-[10px] text-[#525252] resize-none text-[18px] overflow-hidden focus:outline-none focus:ring-0"
                  style={{
                    lineHeight: "30px",
                    height: `${Math.max(
                      30 * example.input.split("\n").length + 10,
                      45
                    )}px`,
                  }}
                ></textarea>
              </div>

              {/* 출력 */}
              <div className="mx-[30px] mb-[10px] flex items-center space-x-[10px]">
                <h3 className="text-[18px] text-[#525252]">출력</h3>
                <textarea
                  value={example.expected_output}
                  readOnly
                  className="flex-1 px-[20px] py-[5px] border-[2px] border-[#969696] rounded-[10px] text-[#525252] resize-none text-[18px] overflow-hidden focus:outline-none focus:ring-0"
                  style={{
                    lineHeight: "30px",
                    height: `${Math.max(
                      30 * example.expected_output.split("\n").length + 10,
                      45
                    )}px`,
                  }}
                ></textarea>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Divider */}
      <div className="w-[1px] bg-[#D9D9D9]"></div>

      {/* Right Panel */}
      <div className="flex-1 relative">
        {/* 확성기와 버튼 섹션 */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between h-[50px] px-4">
          {/* 확성기 아이콘 */}
          <button
            className=" rounded-full focus:outline-none"
            onClick={() => setShowFeedback(!showFeedback)}
          >
            <HiSpeakerphone
              style={{ width: "30px", height: "30px", color: "#FF6E6E" }}
            />
          </button>

          {/* 실행 및 제출 버튼 */}
          <div className="flex space-x-2">
            {/* 실행 버튼 */}
            <button
              className="px-[15px] py-[4px] border-3 border-[#54CEA6] text-[#54CEA6] rounded-full text-[16px] font-extrabold hover:bg-[#e6f8f2] hover:border-[#43A484] hover:text-[#43A484]"
              onClick={handleTestCode}
            >
              테스트
            </button>

            {/* 제출 버튼 */}
            <button
              className="px-[15px] py-[4px] border-3 border-[#54CEA6] text-[#54CEA6] rounded-full text-[16px] font-extrabold hover:bg-[#e6f8f2] hover:border-[#43A484] hover:text-[#43A484]"
              onClick={handleSubmitCode}
            >
              제출
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="absolute top-[50px] left-0 w-full h-[1px] bg-[#D9D9D9]"></div>

        {/* 코드 작성 섹션 */}
        <div className="flex flex-col h-full mt-[50px]">
          <div className="flex-none h-full flex relative items-center justify-center overflow-y-auto">
            <textarea
              onKeyDown={(event) => {
                if (event.key === "Tab") {
                  event.preventDefault();
                  setCode(code + "\t");
                }
              }}
              value={code}
              onScroll={handleScroll}
              ref={textareaRef}
              className="h-full w-full absolute inset-0 p-4 text-transparent font-mono resize-none bg-transparent z-10 focus:outline-none selection:bg-blue-500/50 leading-[1.5] text-[1rem]"
              style={{
                caretColor: "white",
                fontFamily: "Monaco, Consolas, monospace", // 동일한 폰트 패밀리 사용
              }}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
            />
            <div
              ref={highlightRef}
              className="bg-[#2B2B2B] absolute w-full h-full inset-0 overflow-auto pointer-events-none"
            >
              <Highlight
                className="h-full python text-[1rem] leading-[1.5] p-4"
                style={{
                  fontFamily: "Monaco, Consolas, monospace",
                  whiteSpace: "pre",
                }}
              >
                {code}
              </Highlight>
            </div>
          </div>

          {/* 실행 결과 섹션 */}
          {showResult && ( // showResult가 true일 때만 렌더링
            <div className="absolute bg-white border-t-[1px] border-[#D9D9D9] z-20">
              <div className="flex items-center justify-between px-[15px] my-[8px]">
                <h3 className="text-[16px] text-[#525252]">100점</h3>
                <button
                  onClick={() => setShowResult(false)}
                  className="text-[#525252] hover:text-black focus:outline-none"
                >
                  <IoIosCloseCircleOutline
                    style={{ width: "25px", height: "25px", color: "#969696" }}
                  />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenteeDetailAssignmentPage;
