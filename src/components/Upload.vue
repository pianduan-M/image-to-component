<template>
  <div>
    <div>upload</div>

    <div>
      <textarea v-model="result"></textarea>
      <button @click="onClick">生成</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { createWorker } from "tesseract.js";
import { tableColumnTpl, tableTpl } from "../tpl/tpl.ts";

const langData = ".";
const urlList = ref([]);
const result = ref("");

async function onPaste(e) {
  const clipboardItems = await navigator.clipboard.read();

  const clipboardItem = clipboardItems[0];

  for (const type of clipboardItem.types) {
    // 筛选图片类型的文件
    if (type.indexOf("image") > -1) {
      const blob = await clipboardItem.getType(type);
      // 将Blob转换成File
      const file = new File([blob], `image-${Date.now()}`, { type: type });
      // 将Blob转换成url，方便前端展示预览图
      const url = URL.createObjectURL(blob);
      urlList.value.push(url);
    }
  }
  if (urlList.value.length) {
    ocr(urlList.value[0]);
  }
}

async function ocr(filePath) {
  const worker = await createWorker("chi_sim");
  const {
    data: { text },
  } = await worker.recognize(filePath);
  console.log(text);
  result.value = text;
  await worker.terminate();
}

function genTableCode(list) {
  const columns = list.map((text) => {
    text = text.trim();
    return tableColumnTpl.replace("$label", text).replace("$prop", text);
  });

  const table = tableTpl.replace("$data", columns.join("\n"));

  console.log(table, "table");
}

function onClick() {
  genTableCode(result.value.split(" "));
}

onMounted(() => {
  window.addEventListener("paste", onPaste);
});
</script>

<style scoped lang="scss"></style>
