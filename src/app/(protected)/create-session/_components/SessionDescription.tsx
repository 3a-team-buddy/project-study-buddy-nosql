import { useMockTopic } from "@/app/_hooks/use-mock-topic";
import React, { useState, useEffect } from "react";

// const availableTopics = [
//   {
//     id: 1,
//     title: "React Hooks Introduction",
//     description:
//       "useState, useEffect, useContext зэрэг React Hooks-ын үндсэн ойлголтуудыг судална.",
//   },
//   {
//     id: 2,
//     title: "Data Structures Study",
//     description:
//       "Массив, холбосон жагсаалт, мод, граф зэрэг нийтлэг өгөгдлийн бүтцийг гүнзгий судална.",
//   },
//   {
//     id: 3,
//     title: "UI/UX Basics Group",
//     description:
//       "Хэрэглэгчийн интерфэйс ба хэрэглэгчийн туршлагын үндсэн зарчмуудыг судална.",
//   },
// ];

function SessionDescription({
  topicTitle,
  setTopicTitle,
  description,
  setDescription,
}: {
  topicTitle: string;
  setTopicTitle: (topicTitle: string) => void;
  description: string;
  setDescription: (description: string) => void;
}) {
  const { mockTopics } = useMockTopic();
  // const [topicTitle, setTopicTitle] = useState("");

  // const [description, setDescription] = useState("");

  const handleTopicChange = (event: { target: { value: any } }) => {
    const newTitle = event.target.value;
    setTopicTitle(newTitle);

    const selectedTopic = mockTopics.find(
      (topic) => topic.mockTitle === newTitle
    );

    if (selectedTopic) {
      setDescription(selectedTopic.mockDescription);
    } else {
      setDescription("");
    }
  };

  const handleDescriptionChange = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    // setDescription(event.target.value);
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "500px",
        margin: "20px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
      }}
    >
      <h3>Create New Session</h3>

      <div style={{ marginBottom: "15px" }}>
        <label
          htmlFor="topic-input"
          style={{ display: "block", marginBottom: "5px", fontWeight: "bold" }}
        >
          Topic Title
        </label>
        <input
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
        <textarea
          id="description-textarea"
          value={description}
          onChange={handleDescriptionChange}
          placeholder="Сэшний талаар дэлгэрэнгүй бичнэ үү..."
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "1px",
            border: "1px solid #ccc",
            resize: "vertical",
          }}
        />
      </div>
    </div>
  );
}

export default SessionDescription;
