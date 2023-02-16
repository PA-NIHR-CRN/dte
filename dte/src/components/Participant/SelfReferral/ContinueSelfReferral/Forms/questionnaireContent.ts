const content = {
  content: {
    questions: [
      {
        question: "Are you a good person?",
        index: 0,
        flags: [],
        answers: [
          {
            answer: "Yes",
            flags: ["goodperson"],
          },
          {
            answer: "No",
            flags: ["badperson"],
          },
        ],
      },
      {
        question: "Why are you a good person?",
        index: 1,
        flags: ["goodperson"],
        answers: [
          {
            answer: "Because I am",
            flags: [],
          },
          {
            answer: "I lied, I am not",
            flags: [],
          },
          {
            answer: "I didn't read the question",
            flags: [],
          },
        ],
      },
      {
        question: "What is your favorite color?",
        index: 2,
        flags: [],
        answers: [
          {
            answer: "Red",
            flags: ["red"],
          },
          {
            answer: "Blue",
            flags: ["blue"],
          },
          {
            answer: "Green",
            flags: ["green"],
          },
        ],
      },
      {
        question: "Why do you like red?",
        index: 3,
        flags: ["red"],
        answers: [
          {
            answer: "Because it is red",
            flags: [],
          },
          {
            answer: "Because it is a color",
            flags: [],
          },
        ],
      },
      {
        question: "Why do you like blue?",
        index: 4,
        flags: ["blue"],
        answers: [
          {
            answer: "Because it is blue",
            flags: [],
          },
          {
            answer: "Because it is a color",
            flags: [],
          },
        ],
      },
      {
        question: "Why do you like green and are a good person?",
        index: 5,
        flags: ["green", "goodperson"],
        answers: [
          {
            answer: "Because it is green and I am a good person",
            flags: [],
          },
          {
            answer: "Because I am showing a question that requires two flags!",
            flags: ["definitelyADev"],
          },
        ],
      },
    ],
  },
};

export default content;
