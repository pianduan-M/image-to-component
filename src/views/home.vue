<template>
  <div class="home">
    <div class="upload-box" v-if="!currentUrl">
      <UploadDragger
        v-model:file-list="fileList"
        style="width: 500px; height: 500px"
        :multiple="false"
        accept="image/*"
        @change="handleChange"
        @drop="handleDrop"
      >
        <p class="ant-upload-drag-icon">
          <inbox-outlined></inbox-outlined>
        </p>
        <p class="ant-upload-text">点击或者拖拽到此区域</p>
        <p class="ant-upload-hint">只支持单个图片文件</p>
      </UploadDragger>
    </div>

    <div class="result" v-else>
      <div class="input-box">
        <div class="label">
          <span> 识别结果： </span>

          <span style="margin-left: 0.5em" v-if="loading">
            <Space>
              <Spin />
              <span>识别中</span>
            </Space>
          </span>
        </div>
        <Textarea
          :disabled="loading"
          v-model:value="resultText"
          style="width: 100%; height: 200px"
          placeholder="识别结果"
        />
        <div class="label" style="margin-top: 1em">生成类型：</div>
        <Select
          style="width: 100%"
          placeholder="请选择类型"
          v-model:value="resultType"
          @change="onTypeChange"
        >
          <Select.Option label="表格" value="table"> </Select.Option>
          <Select.Option label="表单" value="form"> </Select.Option>
          <Select.Option label="columns" value="columns"> </Select.Option>
          <Select.Option label="formItems" value="formItems"> </Select.Option>
        </Select>

        <div v-if="isShowFormItemsTypeSelect">
          <Form>
            <template v-for="(item, i) in formResultList" :key="item.id">
              <Divider v-if="i !== 0" />
              <FormItem label="label:">
                {{ item.text }}
              </FormItem>
              <FormItem label="类型:">
                <Select
                  style="width: 100%"
                  placeholder="请选择类型"
                  v-model:value="item.type"
                >
                  <Select.Option label="输入框" value="input"> </Select.Option>
                  <Select.Option label="选择框" value="select"> </Select.Option>
                  <Select.Option label="时间选择器" value="date">
                  </Select.Option>
                </Select>
              </FormItem>
            </template>
          </Form>
        </div>

        <div class="btn">
          <Space>
            <Button @click="onBack">返回</Button>
            <Button :disabled="loading" type="primary" @click="onsubmit"
              >确认生成</Button
            >
          </Space>
        </div>
      </div>

      <div class="result-input">
        <div class="label">生成结果：</div>
        <Textarea style="width: 100%; height: 400px" readonly :value="result" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  UploadDragger,
  Textarea,
  Select,
  Button,
  Space,
  Spin,
  Form,
  FormItem,
  Divider,
  message,
} from "ant-design-vue";
import { InboxOutlined } from "@ant-design/icons-vue";
import { ocr } from "../utils/ocr";
import {
  genFormCode,
  genTableCode,
  genPdForm,
  genPageContent,
} from "../tpl/tools";

const fileList = [];
const loading = ref(false);
const currentUrl = ref("");
const resultText = ref("");
const result = ref();
const resultType = ref();
const isShowFormItemsTypeSelect = ref(false);
const formResultList = ref([]);

const handleChange = async (info) => {
  const { file } = info;

  currentUrl.value = URL.createObjectURL(file.originFileObj);

  try {
    loading.value = true;
    const text = await ocr(currentUrl.value);
    resultText.value = text;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
};

function onBack() {
  loading.value = false;
  currentUrl.value = "";
  resultText.value = "";
  result.value = "";
  resultType.value = "";
}

function onsubmit() {
  if (!resultType.value) {
    return message.error("请选择生成类型");
  }

  let list = resultText.value.split(/\s+/);

  let callback;

  switch (resultType.value) {
    case "form":
      callback = genFormCode;
      list = formResultList.value;
      break;
    case "formItems":
      callback = genFormCode;
      list = formResultList.value;
      break;
    case "table":
      callback = genTableCode;
      break;
    case "columns":
      callback = genPageContent;
      break;

    default:
      break;
  }

  if (callback) {
    result.value = callback(list);
  }
}

function onTypeChange(val) {
  if (val.includes("form")) {
    isShowFormItemsTypeSelect.value = true;
    formResultList.value = resultText.value.split(/\s+/).map((text) => ({
      text,
      type: "input",
      id: Math.floor(Math.random() * 10000),
    }));
  } else {
    isShowFormItemsTypeSelect.value = false;
  }
}

function handleDrop(e) {
  console.log(e);
}
</script>

<style scoped lang="scss">
.home {
  width: 100vw;
  height: 100vh;

  .upload-box {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .result {
    display: flex;
    padding: 24px;

    .label {
      font-size: 16px;
      line-height: 1.5;
      margin-bottom: 0.5em;
    }

    .input-box {
      width: 300px;
    }

    .result-input {
      flex: 1;
      padding-left: 24px;
      line-height: 1.5;
    }

    .btn {
      margin-top: 1em;
      display: flex;
      justify-content: flex-end;
    }
  }

  .ant-form-item {
    margin-bottom: 0;
  }
}
</style>
