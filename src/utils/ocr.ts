import { createWorker } from "tesseract.js";

export async function ocr(filePath: any) {
  const worker = await createWorker("chi_sim");
  const {
    data: { text },
  } = await worker.recognize(filePath);

  await worker.terminate();

  return text;
}
