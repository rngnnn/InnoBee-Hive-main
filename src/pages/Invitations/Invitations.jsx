import InvitationCards from "../../components/InvitationCards/InvitationCards";

const Invitations = () => {
  const data = [1, 2, 3];

  return (
    <>
      <h4 className="y-3 font-semibold text-xl">Invitations</h4>
      <p className="py-6">
        Review the invivations you received from other teams and members to
        collaborate on innovative challenges.
      </p>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
        {data?.map((invitation, index) => (
          <InvitationCards invitation={invitation} index={index} />
        ))}
      </div>
      <div className="flex-center justify-center">
        <button className="px-6 py-1 rounded-full border-1 border-brown">
          Load more
        </button>
      </div>
    </>
  );
};

export default Invitations;
