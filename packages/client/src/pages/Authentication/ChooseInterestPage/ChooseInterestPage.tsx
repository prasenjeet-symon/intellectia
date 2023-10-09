import { Button } from "@/components/ui/button";
import { useAssignTopic, useDeleteTopic, useGetAllTopics, useGetAssignedTopics } from "@/hooks/topic.hooks";
import { useNavigate } from "react-router-dom";

function ChooseInterestPage() {
  const { data: allTopics, isLoading: allTopicsLoading } = useGetAllTopics();
  const { data: assignedTopics, isLoading: assignedTopicsLoading } = useGetAssignedTopics();
  const { assign: assignTopic } = useAssignTopic();
  const { delete: deleteTopic } = useDeleteTopic();
  const navigation = useNavigate();

  /**
   * Renders the topics to choose from.
   *
   * @return {Array} An array of topics with an additional 'isSelected' property indicating if the topic is assigned.
   */
  const renderTopicsToChooseFrom = () => {
    if (!allTopics) {
      return [];
    }

    return allTopics.map((p) => {
      return { ...p, isSelected: (assignedTopics ? assignedTopics : []).findIndex((t) => t.id === p.id) > -1 };
    });
  };

  /**
   * Toggles the interest of a topic.
   *
   * @param {object} interest - The interest object containing the id and isSelected properties.
   * @return {void}
   */
  const toggleInterest = (interest: { id: number; isSelected: boolean; [key: string]: any }) => {
    const targetTopic = allTopics.find((t) => t.id === interest.id);
    if (!targetTopic) return;
    interest.isSelected ? deleteTopic(targetTopic) : assignTopic(targetTopic);
  };

  const navigateToDashboard = () => {
    navigation("/dashboard");
  };

  return allTopicsLoading || assignedTopicsLoading ? (
    <div className="flex justify-center items-center h-screen">
      <div className="flex flex-col align-center p-7 ml-2  mr-2 bg-card rounded shadow-sm border-2  md:w-1/3">
        <h2 className="text-2xl font-bold mb-10 text-center">Loading...</h2>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <form className="flex flex-col align-center p-7 ml-2  mr-2 bg-card rounded shadow-sm border-2  md:w-1/3" onSubmit={() => {}}>
        <h2 className="text-2xl font-bold mb-10 text-center">Choose Your Interests</h2>
        <div className="flex flex-wrap justify-center space-y-2">
          {renderTopicsToChooseFrom().map((interest) => (
            <label key={interest.id} className="flex items-center p-2 mr-3">
              <input type="checkbox" value={interest.title} checked={interest.isSelected} onChange={() => toggleInterest(interest)} className="mr-2 form-checkbox h-5 w-5" />
              <span className="text-primary">{interest.title}</span>
            </label>
          ))}
        </div>
        <Button onClick={navigateToDashboard} disabled={!(assignedTopics.length >= 3)} className="mt-10" size={"sm"} type="button" variant={"default"}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default ChooseInterestPage;
