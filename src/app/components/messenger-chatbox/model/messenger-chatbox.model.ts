import { Time } from "@angular/common";

export interface chatHeadUser {
    id: number;
    profilePicture: string;
}

export interface userMessages {
    content: any;
    type: string;
    contentType: string;
    fileUrl?: any;
    fileIcon?: string;
    timeStamp: Date
}

export interface chatBoxMessage {
    userId: number;
    messages: userMessages[]
}
