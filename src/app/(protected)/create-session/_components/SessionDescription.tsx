import React, { useState } from "react";
import { useMockTopic } from "@/app/_hooks/use-mock-topic";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

function SessionDescription({
  topicTitle,
  setTopicTitle,
  description,
  setDescription,
}: {
  topicTitle: string;
  setTopicTitle: (topicTitle: string) => void;
  description: string;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { mockTopics } = useMockTopic();

  const handleTopicChange = (event: { target: { value: string } }) => {
    const newTitle = event.target.value;
    setTopicTitle(newTitle);

    const selectedTopic = mockTopics.find(
      (topic) => topic.mockTitle === newTitle
    );

    if (selectedTopic) {
      setDescription(selectedTopic.mockDescription);
    }
  };

  const handleDescriptionChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setDescription(event.target.value);
  };

  return (
    <div className="w-full">
      <div></div>

      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor="topic-input"
          style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
        >
          Topic Title
        </label>
        <Input
          id="topic-input"
          type="text"
          list="topic-suggestions"
          value={topicTitle}
          onChange={handleTopicChange}
          placeholder="Сэдвээ оруулна уу..."
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />

        <datalist id="topic-suggestions">
          {mockTopics.map((topic) => (
            <option key={topic._id} value={topic.mockTitle} />
          ))}
        </datalist>
      </div>

      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor="description-textarea"
          style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
        >
          Description
        </label>
        <Textarea
          id="description-textarea"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Сэдвийн талаар дэлгэрэнгүй бичнэ үү..."
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "4px",
            border: "1px solid #ccc",
            resize: "vertical",
          }}
        />
      </div>
    </div>
  );
}

export default SessionDescription;

// style={{
//   width: "100%",
//   maxWidth: "400px",
//   margin: "20px",
//   padding: "20px",
//   border: "1px solid #ccc",
//   borderRadius: "8px",
// }}
