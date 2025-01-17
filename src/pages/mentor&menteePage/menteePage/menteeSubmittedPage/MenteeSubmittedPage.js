import React, { useContext, useEffect, useState } from "react";
import { useGetSubmittedList } from "../../../../hooks/useMentee";
import { Context } from "../../../../AppProvider";
import AssignmentsListPageAssignment from "../../components/AssignmentsListPageAssignment";

const MenteeSubmittedPage = () => {
  const getSubmittedListMutation = useGetSubmittedList();
  const [assignmentList, setAssignmentList] = useState();

  const { token, classCode } = useContext(Context);

  useEffect(() => {
    getSubmittedListMutation.mutate(
      { token, classCode },
      {
        onSuccess: (data) => {
          setAssignmentList(data);
        },
      }
    );
  }, []);

  return (
    <div className="flex flex-col items-center justify-center mt-5 mb-10">
      <div className="text-lightBlack text-3xl p-14">제출한 과제</div>
      <div className="flex flex-col gap-5">
        {assignmentList &&
          assignmentList.map((assignment) => {
            return (
              <AssignmentsListPageAssignment
                type={assignment.feedback ? "gotFeedback" : "done"}
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

export default MenteeSubmittedPage;
