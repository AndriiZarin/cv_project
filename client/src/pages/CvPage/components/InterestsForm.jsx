import { useState, useRef } from "react";
import { Label, Button, Icon } from "semantic-ui-react";

const InterestsForm = ({ data, setData }) => {
  const [interest, setInterest] = useState("");
  const interestInput = useRef(null);

  const setInterests = () => {
    interestInput.current.focus();
    setData({ ...data, interests: [...data.interests, interest] });
    setInterest("");
  };
  return (
    <div className="ui container mt-3">
      Interests & Hobbies
      <div className="ui segment   mt-3">
        <div className="ui segment">
          {data.interests &&
            data.interests.map((s, index) => (
              <Label className="mt-1" key={index}>
                {s}
              </Label>
            ))}
        </div>
        <div className="ui column">
          <input
            ref={interestInput}
            type="text"
            value={interest}
            placeholder="interest"
            onChange={(e) => setInterest(e.target.value)}
          />
          <Button
            type="button"
            disabled={interest === "" ? true : false}
            className="mt-1"
            onClick={setInterests}
          >
            <Icon className="icon plus" /> Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InterestsForm;
