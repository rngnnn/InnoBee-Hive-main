import { motion } from "framer-motion";
import { fadeIn } from "../../anim";

const ChallengeTypeCards = ({ challenge, index, setIsCreateChallenge }) => {
  return (
    <motion.div
      variants={fadeIn("right", "spring", index * 0.5, 0.8)}
      initial="hidden"
      animate="show"
      className="p-1 xl:w-1/3 md:w-1/2 w-full"
      key={index}
    >
      <div
        className="shadow rounded-lg bg-white h-full cursor-pointer hover:shadow-lg transition-shadow duration-300"
        onClick={() => setIsCreateChallenge(challenge?.title)}
      >
        <div className="h-2 w-full bg-gradient-to-r from-yellow-300 to-pri-color rounded" />
        <motion.img
          src={challenge.imgUrl}
          alt=""
          className="w-full h-52 object-cover"
          transition={{ type: "spring", stiffness: 200 }}
        />
        <div className="flex-center justify-center flex-col w-full sm:px-6 sm:py-8 px-3 py-5 rounded-b-lg gap-5">
          <h6 className="text-lg font-semibold text-center">
            {challenge?.title}
          </h6>
          <p className="text-center text-gray-500">{challenge?.writeUp}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default ChallengeTypeCards;
