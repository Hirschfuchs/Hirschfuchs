export type WorkInfo = {
  name: string;
  url?: string;
};

export type Info = {
  aboutMe?: ReadonlyArray<{
    name: string;
    emoji: string;
  }>;
  work?: WorkInfo;
  voluntaryWork?: ReadonlyArray<WorkInfo>;
  hobbies?: ReadonlyArray<{
    name: string;
    emoji: string;
  }>;
};
