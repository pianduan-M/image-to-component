import {
  formTpl,
  formItemTpl,
  tableTpl,
  tableColumnTpl,
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
