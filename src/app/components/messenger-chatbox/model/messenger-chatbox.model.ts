import { Time } from "@angular/common";

export interface chatHeadUser {
    id: number;
    profilePicture: string;
}

export interface userMessages {
    content: string;
    type: string;
    file: myFile;
    timeStamp: Date
}
export interface myFile{
    file?: any;
    fileUrl?: any;
    fileIcon?: string;
}
export interface chatBoxMessage {
    userId: number;
    messages: userMessages[]
}
