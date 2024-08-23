export interface Discipline {
  id: string; 
  name: string;
}

export interface Track {
  id: string; 
  type: string;
  discipline: Discipline; 
}

export interface Event {
  id: string; 
  discipline: Discipline; 
  track: Track; 
  timeSlot: {
    id: string;
    startTime: string; 
    endTime: string; 
  };
  minimumDuration: number;
  participantsGender: string;
  participantAgeGroup: string;
  maximumParticipants: number;
}

export interface TimeSlot {
  id: string;
  label: string; 
}


export interface DetailedTimeSlot {
  id: string; 
  startTime: number; 
  endTime: number;   
  date: string; 
  label: string; 
}

