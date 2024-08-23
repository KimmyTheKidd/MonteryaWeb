import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  console.log("Trigger Handler");
  if (req.method === "POST") {
    const { totalBytes, duration } = req.body;

    try {
      const response = await fetch(
        "https://api.monterya.com/AuthTest/dashboardapi/storeNetworkLogs/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            totalBytes,
            duration,
            timestamp: new Date().toISOString(),
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      res.status(200).json({ message: "Usage data sent successfully" });
    } catch (error) {
      console.error("Error sending data:", error);
      res.status(500).json({ message: "Error sending data" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
