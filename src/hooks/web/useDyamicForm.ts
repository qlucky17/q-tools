import { provide, ref } from 'vue';

export function useDyamicForm() {
  const form = ref<Array<any>>([]);
  const addForm = (formInfo: any) => {
    if (formInfo) {
      form.value.push(formInfo);
    }
  };
  const removeForm = (name) => {
    const itemIndex = form.value?.findIndex((m) => m.name == name);
    if (itemIndex !== -1) {
      form.value.splice(itemIndex, 1);
    }
  };
  provide('addForm', addForm);
  provide('removeForm', removeForm);

  const validateAll = () => {
    console.log('form', form);

    return Promise.all(form.value.map((f) => f.form.exposed.validate()));
  };
  const reWriteValidateAll = () => {
    return Promise.all(form.value.map((f) => f.form.exposed.reWriteValidate()));
  };
  const resetValidate = () => {
    return Promise.all(form.value.map((f) => f.form.exposed.clearValidate()));
  };
  return {
    validateAll,
    reWriteValidateAll,
    form,
    resetValidate,
  };
}
