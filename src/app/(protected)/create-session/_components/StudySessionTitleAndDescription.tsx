"use client";

import React, { ChangeEvent, Dispatch } from "react";
import { useMockTopic } from "@/app/_hooks/use-mock-topic";
import { Input, Label, Textarea } from "@/components/ui";

export const StudySessionTitleAndDescription = ({
  sessionTopicTitle,
  setSessionTopicTitle,
  description,
  setDescription,
}: {
  sessionTopicTitle: string;
  setSessionTopicTitle: Dispatch<React.SetStateAction<string>>;
  description: string;
  setDescription: Dispatch<React.SetStateAction<string>>;
}) => {
  const { mockTopics } = useMockTopic();

  const handleSessionTopicTitleChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const newSessionTitle = event.target.value;
    setSessionTopicTitle(newSessionTitle);

    const selectedSessionTopicTitle = mockTopics.find(
      (mockTopic) => mockTopic.mockTitle === newSessionTitle
    );

    if (selectedSessionTopicTitle) {
      setDescription(selectedSessionTopicTitle.mockDescription);
    }
  };

  return (
    <div className="w-full flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <Label htmlFor="topic-title-input">Session Title</Label>
        <Input
          id="topic-title-input"
          type="text"
          list="mock-topic-suggestions"
          value={sessionTopicTitle}
          onChange={handleSessionTopicTitleChange}
          placeholder="Сэдвээ оруулна уу..."
          className="border-border/20 bg-black/50 text-white/80"
        />

        <datalist id="mock-topic-suggestions">
          {mockTopics.map((mockTopic) => (
            <option key={mockTopic._id} value={mockTopic.mockTitle} />
          ))}
        </datalist>
      </div>

      <div className="flex flex-col gap-3">
        <Label htmlFor="description-textarea">Description</Label>
        <Textarea
          id="description-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Сэдвийн талаар товч бичнэ үү..."
          className="min-h-20 border-border/20 bg-black/50 text-white/80"
        />
      </div>
    </div>
  );
};
