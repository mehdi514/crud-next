import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../types/User";

// Sample data for demonstration purposes
const sampleUsers: User[] = [
  { id: 1, username: "john.doe", firstName: "John", lastName: "Doe" },
  { id: 2, username: "jane.smith", firstName: "Jane", lastName: "Smith" },
  { id: 3, username: "alice.green", firstName: "Alice", lastName: "Green" },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    res.status(200).json(sampleUsers);
  } else if (req.method === "POST") {
    // Implement logic to create a new user
    res.status(200).end();
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
