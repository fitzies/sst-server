import { bot } from "./index.ts";

function transformToTitleCase(input: string): string {
  return input
    .split("-") // Split the string by hyphens
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize each word
    .join(" "); // Join the words with a space
}

const approveSST = async (id: string): Promise<any> => {
  const res = await fetch(`https://2sir.vercel.app/api/approve-sst/${id}`);
  const data = await res.json();
  await sendToGroupChat(data.first);
};

const sendToGroupChat = async (response: {
  id: string;
  company: string;
  date: string;
  time: string;
  type: string;
  location: string;
  noOfParticipants: number;
  conductingOfficer: string;
  approvingOfficer: string;
  approved: boolean;
}) => {
  const {
    company,
    date,
    time,
    type,
    location,
    noOfParticipants,
    conductingOfficer,
    approvingOfficer,
    approved,
  } = response;

  const message = `
🚨 New Activity Conducted 🚨

Conducting Officer: ${conductingOfficer}
Company: ${company}
Activity Type: ${transformToTitleCase(type)}
Date: ${date}
Time: ${time}
Location: ${location}
Pax: ${noOfParticipants}

This conduct was approved by: ${transformToTitleCase(approvingOfficer)}
`;

  if (response.approved === true) {
    console.log("Already approved");
    return null;
  }

  await bot.api.sendMessage("-1002400876232", message);
};

export { approveSST, sendToGroupChat };
