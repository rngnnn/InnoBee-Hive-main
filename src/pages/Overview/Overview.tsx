import { useState } from 'react';
import HomeSlider from '../../components/HomeSlider';
import HomeStepCard from '../../components/HomeStepCard';
import { stepsData } from '../../constants';

import WelcomeOnboardingPopups from '../../components/welcomeOnboardingPopups/WelcomeOnboardingPopups';

const Overview = () => {
	// const [progress, setProgress] = useState(60);

	const [completedSteps, setCompletedSteps] = useState(
		Array(stepsData.length).fill(false)
	);
	const [completedSteps2, setCompletedSteps2] = useState(
		Array(stepsData.length).fill(false)
	);
	const [completedSteps3, setCompletedSteps3] = useState(
		Array(stepsData.length).fill(false)
	);

	const toggleStep = (index: number) => {
		const newCompletedSteps = [...completedSteps];
		newCompletedSteps[index] = !newCompletedSteps[index];
		setCompletedSteps(newCompletedSteps);
	};

	const toggleStep2 = (index: number) => {
		const newCompletedSteps = [...completedSteps2];
		newCompletedSteps[index] = !newCompletedSteps[index];
		setCompletedSteps2(newCompletedSteps);
	};

	const toggleStep3 = (index: number) => {
		const newCompletedSteps = [...completedSteps3];
		newCompletedSteps[index] = !newCompletedSteps[index];
		setCompletedSteps3(newCompletedSteps);
	};

	// const handleIncreaseProgress = () => {
	//   setProgress((prevProgress) =>
	//     prevProgress < 100 ? prevProgress + 10 : 100
	//   );
	// };

	return (
		<>
			<h4 className="y-3 font-semibold text-xl">Home</h4>
			<p className="py-6">Get an overview of your innovative efforts. </p>
			<div className="flex w-full flex-wrap gap-4">
				<HomeSlider />
				<HomeStepCard
					progress={60}
					stepsData={stepsData}
					onToggle={toggleStep}
					isCompleted={completedSteps}
					title="Innovation journey progress"
				/>
				{/* 
        <HomeStepCard
          progress={13}
          stepsData={stepsData2}
          onToggle={toggleStep2}
          isCompleted={completedSteps2}
          title="Unlock all pro features for one month (second time!)"
        />
        <HomeStepCard
          progress={90}
          stepsData={stepsData3}
          onToggle={toggleStep3}
          isCompleted={completedSteps3}
          title="Unlock all pro features for one month"
        />
        </div>
        <Button
          className="getting-started-btn ml-auto z-40 mb-4 text-xs px-[7px]"
          variant="neutral"
          label="Getting started"
          iconRight={<BsRocket />}
        />
        <div className="centered-popup-target absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 "></div>
        <div className="siderbar-popup-mobile absolute top-0 left-0 w-8 h-full ">
        */}
			</div>
			<WelcomeOnboardingPopups />
			<div className="mb-8"></div>{' '}
			{/* MOHAMMAD: Needed some space after the section. Feel free to change it.*/}
		</>
	);
};

export default Overview;

// **Regarding Automatic Checkbox Behavior:**

// To implement the automatic checking of checkboxes based on achieved milestones,
// you will need to modify the parent component that uses `HomeStepCard` (likely the `Overview` component).

// Here's the general approach:

// 1. **Identify Milestone Events:** Determine the specific events in your application that signify a user achieving a milestone (e.g., adding a picture, creating a challenge).

// 2. **Track Milestone Completion:** In your parent component's state or through a state management solution (like Redux or Context API), you need to keep track of which milestones have been achieved by the user.

// 3. **Update `isCompleted` State:** When a milestone event occurs, you need to update the corresponding `completedSteps` state (or `completedSteps2`, `completedSteps3` depending on which `HomeStepCard` it belongs to) in the parent component.

//    For example, if `stepsData` in the `Overview` component corresponds to the "Innovation journey progress" card, and the first step is "Add a picture," when the user successfully adds a picture, you would update the `completedSteps` array in the `Overview` component at index 0 to `true`.

//    ```javascript
//    // In your Overview component (parent of HomeStepCard)

//    const Overview = () => {
//      const [completedSteps, setCompletedSteps] = useState(
//        Array(stepsData.length).fill(false)
//      );

//      // ... other state and functions

//      // Example function triggered when a user adds a picture
//      const handlePictureAdded = () => {
//        const newCompletedSteps = [...completedSteps];
//        newCompletedSteps[0] = true; // Assuming "Add a picture" is the first step
//        setCompletedSteps(newCompletedSteps);
//      };

//      // ... your return statement including the HomeStepCard
//      <HomeStepCard
//        progress={60}
//        stepsData={stepsData}
//        onToggle={toggleStep}
//        isCompleted={completedSteps}
//        title="Innovation journey progress"
//      />
//      // ...
//    };
//    ```

// 4. **The `HomeStepCard` Will Automatically Update:** Because the `isCompleted` prop in `HomeStepCard` is directly linked to the state in the parent component, when the state in the parent updates, the `HomeStepCard` component will re-render, and the checkbox for the corresponding step will automatically appear as checked.

// **Important Considerations:**

// * **Data Flow:** Ensure the logic for detecting milestone achievements and updating the state resides in the appropriate place (usually the parent component or a state management layer).
// * **Mapping Milestones to Steps:** Make sure you have a clear mapping between the milestone events and the index of the corresponding step in your `stepsData` array.
// * **User Feedback:** You might want to provide visual feedback to the user when a milestone is achieved, in addition to the checkbox being checked.

// By following this pattern, the checkboxes in your `HomeStepCard` component will be automatically checked when the relevant milestones are achieved by the user. The user will still be able to manually toggle them based on the existing `onToggle` function. If you want to prevent manual unchecking of automatically completed steps, you would need to add additional logic and potentially disable the button or visually indicate its auto-completed status.
