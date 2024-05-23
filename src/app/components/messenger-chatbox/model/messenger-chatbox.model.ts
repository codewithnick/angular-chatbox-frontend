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
}

export interface chatBoxMessage {
    userId: number;
    messages: userMessages[]
}
