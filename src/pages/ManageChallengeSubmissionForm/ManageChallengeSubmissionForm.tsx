import DashboardHeader from "src/components/bee-interface/DashboardHeader";
import Builder from "./components/builder/index";
import useMenuItems from "./lib/menuItems";

const ManageChallengeSubmissionForm = () => {
  const menuItems = useMenuItems();

  return (
    <div>
      <DashboardHeader title="Manage Challenge" menuItems={menuItems} />
      <br />

      <h6 className="font-bold text-lg mt-2">Submission Form</h6>
      <p className="bg-pri-color text-brown-900 border border-pri-color p-3 rounded my-3 text-sm">
        Create the submission form for your challenge. Participants will fill out
        this from and judges will use the response to select the winners of the
        challenge. Add as many field as necessary. Be clear and concise and ask
        for all relevant information. Regardless of the custom fields you add to
        the submission form, there are three fields that will be automatically
        included in your form: The Submission Title, a Short Description of the
        submission, and an Image that illustrates the submission. Include clear
        questions in your submission form. This will be the information that you
        will use to select the winners.
        Note: The submission form cannot be updated once the challenge transitions
        to the Submission Open stage.
      </p>{" "}
      <h6 className="font-bold mt-6">Additional Fields</h6>
      <p>
        Add custom fields to your submission form either by clicking on the “Add
        new field to form” button. You can select the type of information you
        require from the challenge solvers and also drag and arrange the custom
        fields to create your desired submission form.
      </p>
      <br />
      <Builder />
      <br />
    </div>
  );
};

export default ManageChallengeSubmissionForm;
