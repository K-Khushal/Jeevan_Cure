export interface UploadedFile {
  key: string;
  name: string;
  url: string;
  size: number;
  type: string;
}

export interface Appointment {
  id: string;
  title: string;
  date: Date;
  startTime: Date;
  endTime: Date;
  color: string;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
