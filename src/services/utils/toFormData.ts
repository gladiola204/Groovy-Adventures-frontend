// Definicja typów dla argumentów funkcji
type FormDataInputValue = File | string | number | boolean | FormDataInputValue[] | { [key: string]: FormDataInputValue } | any;

function toFormData<T extends { [key: string]: any }>(data: T): FormData {
  const formData = new FormData();

  function appendFormData(key: string, value: any) {

    if (Array.isArray(value) && value.length > 0 && value[0] instanceof File) {
      value.forEach((file, index) => {
        formData.append(`${key}`, file, `${key}-${index}`);
      });
    } else if (value instanceof File) {
      formData.append(key, value);
    } else if (Array.isArray(value)) {
      value.forEach((subValue, index) => appendFormData(`${key}[${index}]`, subValue));
    } else if (typeof value === 'object' && value !== null) {
      Object.entries(value).forEach(([subKey, subValue]) => appendFormData(`${key}[${subKey}]`, subValue));
    } else if (value !== null && value !== undefined) { // Dodano sprawdzenie, aby uniknąć dodawania null/undefined
      formData.append(key, value.toString());
    }
  }

  Object.entries(data).forEach(([key, value]) => appendFormData(key, value));

  return formData;
}
  
export default toFormData;