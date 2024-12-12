export const tableTpl = `<el-table>\n$data\n</el-table>`;

export const tableColumnTpl = `<el-table-column label="$label" prop="$prop" ></el-table-column>`;

export const formItemTpl = `<el-form-item label="$label" prop="$prop" >$children</el-form-item>`;

export const formTpl = `<el-form :model="formData" label-position="left" label-width="auto">\n$data\n</el-form>`;

export const inputTpl = `<el-input v-model="formData.$prop" size="md" placeholder="请输入"></el-input>`;

export const selectTpl = `<el-select v-model="formData.$prop" >\n<el-option></el-option>\n</el-select>`;
