export const experiments = [
  {
    id: 1,
    name: "Experiment1 name",
    description: "Experiment1 description",
    coordinator: "Experiment1 coordinator",
    place: "Experiment1 place",
    state: "ongoing",
    critical: {
      title: "Experiment1 critical title",
      description: "E1 Lorem ipsum dolor..."
    },
    duration: { start: new Date(2024, 1, 1), end: null },
  },
  {
    id: 2,
    name: "Experiment2 name",
    description: "Experiment2 description",
    coordinator: "Experiment2 coordinator",
    place: "Experiment2 place",
    state: "ongoing",
    duration: { start: new Date(2024, 1, 1), end: new Date(2025, 1, 1) },
  },
  {
    id: 3,
    name: "Experiment3 name",
    description: "Experiment3 description",
    coordinator: "Experiment3 coordinator",
    place: "Experiment3 place",
    state: "closed",
    critical: {
      title: "Experiment2 critical title",
      description: "E2 Lorem ipsum dolor..."
    },
    duration: { start: new Date(2024, 1, 1), end: new Date(2025, 1, 1) },
  },
  {
    id: 4,
    name: "Experiment4 name",
    description: "Experiment4 description",
    coordinator: "Experiment4 coordinator",
    place: "Experiment4 place",
    state: "closed",
    duration: { start: new Date(2024, 1, 1), end: new Date(2025, 1, 1) },
  },
];
