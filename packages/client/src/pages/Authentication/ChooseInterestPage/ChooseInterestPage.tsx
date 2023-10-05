import { Button } from '@/components/ui/button';
import React, { useState } from 'react';

type SelectedInterests = string[];

const interestsList: string[] = [
    'Programming Languages',
    'Software Development',
    'Web Development',
    'Machine Learning',
    'Data Science',
    'Artificial Intelligence',
    'Cybersecurity',
    'Blockchain',
    'Cloud Computing',
    'DevOps',
    'IoT',
    'Robotics',
];

function ChooseInterestPage() {
  const [selectedInterests, setSelectedInterests] = useState<SelectedInterests>([]);

  const toggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Selected interests:', selectedInterests);
    // Add logic here to save selected interests to your database or perform other actions.
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form className="flex flex-col align-center p-7 ml-2  mr-2 bg-card rounded shadow-sm border-2  md:w-1/3" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-10 text-center">Choose Your Interests</h2>
        <div className="flex flex-wrap justify-center space-y-2">
          {interestsList.map((interest) => (
            <label key={interest} className="flex items-center p-2 mr-3">
              <input
                type="checkbox"
                value={interest}
                checked={selectedInterests.includes(interest)}
                onChange={() => toggleInterest(interest)}
                className="mr-2 form-checkbox h-5 w-5"
              />
              <span className="text-primary">{interest}</span>
            </label>
          ))}
        </div>
        <Button className="mt-10" size={'sm'} type='submit' variant={'default'}>Submit</Button>
      </form>
    </div>
  );
}

export default ChooseInterestPage;
