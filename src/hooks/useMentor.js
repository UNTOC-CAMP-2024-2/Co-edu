import { useMutation } from "@tanstack/react-query";
import {
  createAssignment,
  getAssignmentDetail,
  getAssignmentList,
  editAssignment,
  getMentorFeedbackList,
} from "../api/mentor";

export const useCreateAssignment = () => {
  return useMutation({
    mutationFn: createAssignment,
    onSuccess: (data) => {
      console.log("과제 생성 성공", data);
      alert("과제가 생성되었습니다.");
    },
    onError: (error) => {
      console.log("과제 생성 실패", error);
      alert(
        `과제 생성에 실패했습니다: ${
          error.response?.data?.detail || error.message
        }`
      );
    },
  });
};

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

export const useEditAssignment = () => {
  return useMutation({
    mutationFn: editAssignment,
    onSuccess: (data) => {
      console.log("과제 수정 성공", data);
      alert("과제 수정이 완료되었습니다.");
    },
    onError: (error) => {
      console.log("과제 수정 실패", error);
      alert("과제 수정에 실패했습니다.");
    },
  });
};

export const useGetMentorFeedbackList = () => {
  return useMutation({
    mutationFn: getMentorFeedbackList,
    onSuccess: (data) => {
      console.log("멘토 피드백 리스트 조회 성공", data);
    },
    onError: (error) => {
      console.log("멘토 피드백 리스트 조회 실패", error);
    },
  });
};
