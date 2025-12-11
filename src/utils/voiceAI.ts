export const startVoiceRecognition = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      const SpeechRecognition =
        (window as any).SpeechRecognition ||
        (window as any).webkitSpeechRecognition;

      if (!SpeechRecognition) {
        reject("SpeechRecognition not supported.");
        return;
      }

      const recognition = new SpeechRecognition();
      recognition.lang = "en-US";
      recognition.interimResults = false;
      recognition.continuous = false;

      recognition.onstart = () => {
        console.log("🎤 Voice listening started...");
      };

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        console.log("Heard:", text);
        resolve(text);
      };

      recognition.onerror = (event: any) => {
        console.error("Speech error:", event.error);
        reject(event.error);
      };

      recognition.onend = () => {
        console.log("🎤 Voice listening ended.");
      };

      recognition.start();
    } catch (e) {
      reject(e);
    }
  });
};

export const askGPT = async (query: string) => {
  const res = await fetch("/api/voice-ai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query }),
  });

  if (!res.ok) {
    console.log("GPT API error");
  }

  return await res.json();
};
