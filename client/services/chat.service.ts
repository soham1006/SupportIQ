import { api } from "@/lib/api";

export async function sendMessage(data: {
  message: string;
}) {
  const response = await api.post(
    "/ai/chat",
    data,
  );

  return response.data;
}