import { useMutation } from "@tanstack/react-query";
import {
  getAllFeedback,
  getAssignmentDetail,
  getAssignmentList,
  getFeedback,
  getSubmittedList,
  submitCode,
  testCode,
} from "../api/mentee";

export const useGetAssignmentList = () => {
  return useMutation({
    mutationFn: getAssignmentList,
    onSuccess: (data) => {
      console.log("과제 리스트 조회 성공", data);
    },
    onError: (error) => {
      console.log("과제 리스트 조회 실패", error);
    },
  });
};

export const useGetAssignmentDetail = () => {
  return useMutation({
    mutationFn: getAssignmentDetail,
    onSuccess: (data) => {
      console.log("과제 상세 조회 성공", data);
    },
    onError: (error) => {
      console.log("과제 상세 조회 실패", error);
    },
  });
};

export const useSubmitCode = () => {
  return useMutation({
    mutationFn: submitCode,
    onSuccess: (data) => {
      console.log("코드 제출 성공", data);
    },
    onError: (error) => {
      console.log("코드 제출 실패", error);
    },
  });
};

export const useTestCode = () => {
  return useMutation({
    mutationFn: testCode,
    onSuccess: (data) => {
      console.log("코드 테스트 성공", data);
    },
    onError: (error) => {
      console.log("코드 테스트 실패", error);
    },
  });
};

export const useGetFeedback = () => {
  return useMutation({
    mutationFn: getFeedback,
    onSuccess: (data) => {
      console.log("피드백 조회 성공", data);
    },
    onError: (error) => {
      console.log("피드백 조회 실패", error);
    },
  });
};

export const useGetAllFeedback = () => {
  return useMutation({
    mutationFn: getAllFeedback,
    onSuccess: (data) => {
      console.log("모든 피드백 조회 성공", data);
    },
    onError: (error) => {
      console.log("모든 피드백 조회 실패", error);
    },
  });
};

export const useGetSubmittedList = () => {
  return useMutation({
    mutationFn: getSubmittedList,
    onSuccess: (data) => {
      console.log("제출한 과제 조회 성공", data);
    },
    onError: (error) => {
      console.log("제출한 과제 조회 실패", error);
    },
  });
};
