export type IMessage = {
  _id: string;
  content: string;
  team: string;
  sender: {
    role: string;
    _id: string;
    name: string;
  };
  createdAt: string;
  __v: 0;
};

export type IMessageResponse = {
  status: string;
  data: {
    messages: IMessage[];
  };
};
export type ISendMessage = {
  _id: string;
  content: string;
  sender: string;
  team: string;
  createdAt: string;
  __v: 0;
};

export type ISendMessageResponse = {
  status: string;
  message: string;
  data: {
    message: ISendMessage;
  };
};
