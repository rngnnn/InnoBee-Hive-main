import InvitationCards from "../../components/InvitationCards/InvitationCards";

const JudgingInvitation = () => {
  const data = [1];

  return (
    <>
      <h4 className="y-3 font-semibold text-xl">Judge Invitations</h4>
      <p className="py-6">
        Review the invitations you received from challenge creators to
        participate in innovative challenges as a judge. Once you accept an
        invitation, you can judge the challenge from My Tasks menu.
      </p>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {data?.map((invitation, index) => (
          <InvitationCards
            key={index}
            invitation={invitation}
            index={index}
            judgeInvitation
          />
        ))}
      </div>
    </>
  );
};

export default JudgingInvitation;
