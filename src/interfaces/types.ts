export interface Discipline {
  id: string; // or number, depending on your backend
  name: string;
}

export interface Track {
  id: string; // or number, depending on your backend
  type: string;
  discipline: Discipline; // Assuming each track has a discipline associated with it
}

export interface Event {
  id: string; // or number, depending on your backend
  discipline: Discipline; // Assuming each event has a discipline
  track: Track; // Assuming each event has a track
  timeSlot: {
    startTime: string; // Adjust type as necessary
    endTime: string; // Adjust type as necessary
  };
  minimumDuration: number;
  participantsGender: string;
  participantAgeGroup: string;
  maximumParticipants: number;
}