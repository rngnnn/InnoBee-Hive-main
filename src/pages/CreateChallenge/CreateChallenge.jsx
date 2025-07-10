import { useState } from "react";

import ChallengeTypeCards from "../../components/ChallengeComponent/ChallengeTypeCards";
import CreateChallengeForm from "../../components/ChallengeComponent/CreateChallengeForm";

import { ChallengeTypes } from "../../constants";

const CreateChallenge = () => {
  const [isCreateChallenge, setIsCreateChallenge] = useState(false);
  return (
    <>
      <h4 className="y-3 font-semibold text-xl">Create A Challenge</h4>
      {!isCreateChallenge ? (
        <div className="mt-8">
          <p>First, select what type of solution you are looking for.</p>
          <div className="flex flex-wrap py-4">
            {ChallengeTypes?.map((challenge, index) => (
              <ChallengeTypeCards
                challenge={challenge}
                key={index}
                index={index}
                setIsCreateChallenge={setIsCreateChallenge}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="w-full">
          <CreateChallengeForm />
        </div>
      )}
      <div className= "mb-8"></div> {/* MOHAMMAD: Needed some space after the section. Feel free to change it.*/}
    </>
  );
};

export default CreateChallenge;
