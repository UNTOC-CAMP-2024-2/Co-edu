import React, { useContext, useEffect, useState } from "react";
import AssignmentsListPageAssignment from "../../components/AssignmentsListPageAssignment";
import { Context } from "../../../../AppProvider";
import { useGetAllFeedback } from "../../../../hooks/useMentee";

const MenteeFeedbackPage = () => {
  const getAllFeedbackMutation = useGetAllFeedback();
  const [assignmentList, setAssignmentList] = useState();

  const { token, classCode } = useContext(Context);

  useEffect(() => {
    getAllFeedbackMutation.mutate(
      { token, classCode },
      {
        onSuccess: (data) => {
          data === "받은 피드백이 없습니다."
            ? setAssignmentList([])
            : setAssignmentList(data);
        },
      }
    );
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-5 mb-10">
      <div className="text-lightBlack text-3xl p-14">피드백 모아보기</div>
      <div className="flex flex-col gap-5">
        {assignmentList &&
          assignmentList.map((assignment) => {
            return (
              <AssignmentsListPageAssignment
                type={"gotFeedback"}
                assignmentTitle={assignment.title}
                description={assignment.description}
                assignmentId={assignment.assignment_id}
              />
            );
          })}
      </div>
    </div>
  );
};

export default MenteeFeedbackPage;
