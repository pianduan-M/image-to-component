import { formTpl, formItemTpl, tableTpl, tableColumnTpl } from "./tpl.ts";

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

export function genFormCode(list: any) {
  const formItems = list.map((text: string) => {
    text = text.trim();
    return formItemTpl.replace("$label", text).replace("$prop", text);
  });

  const form = formTpl.replace("$data", formItems.join("\n"));

  return form;
}
