import {
  formTpl,
  formItemTpl,
  tableTpl,
  tableColumnTpl,
  inputTpl,
  selectTpl,
  dateTpl,
} from "./tpl.ts";

const LocalTplKey = "LOCAL_TPL__";

export function getLocalTpls() {
  let result: any = localStorage.getItem(LocalTplKey);

  if (result) {
    result = JSON.parse(result);
  } else {
    result = [];
  }

  return result;
}

export function setLocalTpl(tplItem: any) {
  let result: any = getLocalTpls();
  result.push(tplItem);
  result = JSON.stringify(result);
  localStorage.setItem(LocalTplKey, result);
}

export function getAllTplList() {}

export function genTableCode(list: any) {
  const columns = list.map((text: string) => {
    text = text.trim();
    return tableColumnTpl.replace("$label", text).replace("$prop", text);
  });

  const table = tableTpl.replace("$data", columns.join("\n"));

  return table;
}

export function genFormCode(list: any[]) {
  const formItems = list.map((item: any) => {
    let { text, type = "input" } = item;

    let component;

    switch (type) {
      case "input":
        component = inputTpl;
        break;
      case "select":
        component = selectTpl;
        break;
      case "date":
        component = dateTpl;
        break;

      default:
        component = inputTpl;
        break;
    }

    text = text.trim();
    return formItemTpl
      .replace("$label", text)
      .replace("$prop", text)
      .replace("$children", component.replace("$prop", text));
  });

  const form = formTpl.replace("$data", formItems.join("\n"));

  return form;
}

export function genPageContent(list: string[]) {
  const result = list.map((text: string) => {
    text = text.trim();
    let result;

    if (text === "操作") {
      result = {
        label: text,
        slot: "operate",
      };
    } else {
      result = {
        label: text,
        prop: text,
      };
    }

    return result;
  });

  return JSON.stringify(result);
}

export function genPdForm(list: object[]) {
  const result = list.map((item: any) => {
    let { text, type = "input" } = item;
    text = text.trim();
    const result: any = {};

    result.label = text;
    result.prop = text;
    result.component = type;

    return result;
  });

  return JSON.stringify(result);
}
