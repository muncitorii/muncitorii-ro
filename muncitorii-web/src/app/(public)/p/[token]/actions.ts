"use server";

import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { approveStage, decideChangeOrder } from "@/lib/coordonare/data";

async function clientIp(): Promise<string> {
  const h = await headers();
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() || h.get("x-real-ip") || "unknown";
}

export async function approveStageFormAction(formData: FormData) {
  const stageId = String(formData.get("stage_id") || "");
  const token = String(formData.get("token") || "");
  if (!stageId || !token) return;

  const ip = await clientIp();
  await approveStage(stageId, ip);
  revalidatePath(`/p/${token}`);
}

export async function decideChangeOrderFormAction(formData: FormData) {
  const changeOrderId = String(formData.get("change_order_id") || "");
  const token = String(formData.get("token") || "");
  const decision = String(formData.get("decision") || "") as "approved" | "rejected";
  if (!changeOrderId || !token || (decision !== "approved" && decision !== "rejected")) return;

  const ip = await clientIp();
  await decideChangeOrder(changeOrderId, decision, ip);
  revalidatePath(`/p/${token}`);
}
